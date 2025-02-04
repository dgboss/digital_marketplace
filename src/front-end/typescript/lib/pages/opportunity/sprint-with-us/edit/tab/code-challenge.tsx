import { EMPTY_STRING } from "front-end/config";
import { makeStartLoading, makeStopLoading } from "front-end/lib";
import { Route } from "front-end/lib/app/types";
import * as Table from "front-end/lib/components/table";
import {
  ComponentView,
  Dispatch,
  GlobalComponentMsg,
  immutable,
  Immutable,
  Init,
  mapComponentDispatch,
  newRoute,
  toast,
  Update,
  updateComponentChild,
  View
} from "front-end/lib/framework";
import * as api from "front-end/lib/http/api";
import * as Tab from "front-end/lib/pages/opportunity/sprint-with-us/edit/tab";
import * as opportunityToasts from "front-end/lib/pages/opportunity/sprint-with-us/lib/toasts";
import EditTabHeader from "front-end/lib/pages/opportunity/sprint-with-us/lib/views/edit-tab-header";
import {
  swuProposalStatusToColor,
  swuProposalStatusToTitleCase
} from "front-end/lib/pages/proposal/sprint-with-us/lib";
import * as proposalToasts from "front-end/lib/pages/proposal/sprint-with-us/lib/toasts";
import Badge from "front-end/lib/views/badge";
import Link, {
  iconLinkSymbol,
  leftPlacement,
  routeDest
} from "front-end/lib/views/link";
import ReportCardList, {
  ReportCard
} from "front-end/lib/views/report-card-list";
import React from "react";
import { Col, Row } from "reactstrap";
import {
  canSWUOpportunityBeScreenedInToTeamScenario,
  canViewSWUOpportunityProposals,
  hasSWUOpportunityPassedCodeChallenge,
  SWUOpportunity,
  SWUOpportunityStatus
} from "shared/lib/resources/opportunity/sprint-with-us";
import {
  canSWUProposalBeScreenedToFromTeamScenario,
  compareSWUProposalsForPublicSector,
  getSWUProponentName,
  isSWUProposalInCodeChallenge,
  NUM_SCORE_DECIMALS,
  SWUProposalSlim,
  SWUProposalStatus
} from "shared/lib/resources/proposal/sprint-with-us";
import { ADT, adt, Id } from "shared/lib/types";

type ModalId = ADT<"completeCodeChallenge">;

export interface State extends Tab.Params {
  showModal: ModalId | null;
  completeCodeChallengeLoading: number;
  screenToFromLoading: Id | null;
  canProposalsBeScreened: boolean;
  canViewProposals: boolean;
  proposals: SWUProposalSlim[];
  table: Immutable<Table.State>;
}

export type InnerMsg =
  | ADT<"table", Table.Msg>
  | ADT<"showModal", ModalId>
  | ADT<"hideModal">
  | ADT<"screenInToTeamScenario", Id>
  | ADT<"screenOutOfTeamScenario", Id>
  | ADT<"completeCodeChallenge">;

export type Msg = GlobalComponentMsg<InnerMsg, Route>;

const init: Init<Tab.Params, State> = async (params) => {
  const canViewProposals =
    canViewSWUOpportunityProposals(params.opportunity) &&
    hasSWUOpportunityPassedCodeChallenge(params.opportunity);
  let proposals: SWUProposalSlim[] = [];
  if (canViewProposals) {
    const proposalResult = await api.proposals.swu.readMany(
      params.opportunity.id
    );
    proposals = api
      .getValidValue(proposalResult, [])
      .filter((p) => isSWUProposalInCodeChallenge(p))
      .sort((a, b) =>
        compareSWUProposalsForPublicSector(a, b, "challengeScore")
      );
  }
  // Can be screened in if...
  // - Opportunity has the appropriate status; and
  // - At least one proposal has been evaluated.
  const canProposalsBeScreened =
    canSWUOpportunityBeScreenedInToTeamScenario(params.opportunity) &&
    proposals.reduce(
      (acc, p) => acc || canSWUProposalBeScreenedToFromTeamScenario(p),
      false as boolean
    );
  return {
    completeCodeChallengeLoading: 0,
    screenToFromLoading: null,
    showModal: null,
    canViewProposals: canViewProposals && !!proposals.length,
    canProposalsBeScreened,
    proposals,
    table: immutable(
      await Table.init({
        idNamespace: "proposal-table"
      })
    ),
    ...params
  };
};

const startCompleteCodeChallengeLoading = makeStartLoading<State>(
  "completeCodeChallengeLoading"
);
const stopCompleteCodeChallengeLoading = makeStopLoading<State>(
  "completeCodeChallengeLoading"
);

const update: Update<State, Msg> = ({ state, msg }) => {
  switch (msg.tag) {
    case "completeCodeChallenge":
      state = state.set("showModal", null);
      return [
        startCompleteCodeChallengeLoading(state),
        async (state, dispatch) => {
          const result = await api.opportunities.swu.update(
            state.opportunity.id,
            adt("startTeamScenario", "")
          );
          if (!api.isValid(result)) {
            dispatch(
              toast(
                adt(
                  "error",
                  opportunityToasts.statusChanged.error(
                    SWUOpportunityStatus.EvaluationTeamScenario
                  )
                )
              )
            );
            return stopCompleteCodeChallengeLoading(state);
          }
          dispatch(
            toast(
              adt(
                "success",
                opportunityToasts.statusChanged.success(
                  SWUOpportunityStatus.EvaluationTeamScenario
                )
              )
            )
          );
          dispatch(
            newRoute(
              adt("opportunitySWUEdit", {
                opportunityId: state.opportunity.id,
                tab: "teamScenario" as const
              })
            ) as Msg
          );
          return state;
        }
      ];

    case "screenInToTeamScenario":
      state = state.set("showModal", null);
      return [
        state.set("screenToFromLoading", msg.value),
        async (state, dispatch) => {
          state = state.set("screenToFromLoading", null);
          const updateResult = await api.proposals.swu.update(
            msg.value,
            adt("screenInToTeamScenario", "")
          );
          switch (updateResult.tag) {
            case "valid":
              dispatch(
                toast(adt("success", proposalToasts.screenedIn.success))
              );
              return immutable(
                await init({
                  opportunity: api.getValidValue(
                    await api.opportunities.swu.readOne(state.opportunity.id),
                    state.opportunity
                  ),
                  viewerUser: state.viewerUser
                })
              );
            case "invalid":
            case "unhandled":
              dispatch(toast(adt("error", proposalToasts.screenedIn.error)));
              return state;
          }
        }
      ];

    case "screenOutOfTeamScenario":
      state = state.set("showModal", null);
      return [
        state.set("screenToFromLoading", msg.value),
        async (state, dispatch) => {
          state = state.set("screenToFromLoading", null);
          const updateResult = await api.proposals.swu.update(
            msg.value,
            adt("screenOutFromTeamScenario", "")
          );
          switch (updateResult.tag) {
            case "valid":
              dispatch(
                toast(adt("success", proposalToasts.screenedOut.success))
              );
              return immutable(
                await init({
                  opportunity: api.getValidValue(
                    await api.opportunities.swu.readOne(state.opportunity.id),
                    state.opportunity
                  ),
                  viewerUser: state.viewerUser
                })
              );
            case "invalid":
            case "unhandled":
              dispatch(toast(adt("error", proposalToasts.screenedOut.error)));
              return state;
          }
        }
      ];

    case "showModal":
      return [state.set("showModal", msg.value)];

    case "hideModal":
      return [state.set("showModal", null)];

    case "table":
      return updateComponentChild({
        state,
        childStatePath: ["table"],
        childUpdate: Table.update,
        childMsg: msg.value,
        mapChildMsg: (value) => ({ tag: "table", value })
      });

    default:
      return [state];
  }
};

const makeCardData = (
  opportunity: SWUOpportunity,
  proposals: SWUProposalSlim[]
): ReportCard[] => {
  const numProposals = proposals.length;
  const [highestScore, averageScore] = proposals.reduce(
    ([highest, average], { challengeScore }, i) => {
      if (!challengeScore) {
        return [highest, average];
      }
      return [
        challengeScore > highest ? challengeScore : highest,
        (average * i + challengeScore) / (i + 1)
      ];
    },
    [0, 0]
  );
  const isComplete = hasSWUOpportunityPassedCodeChallenge(opportunity);
  return [
    {
      icon: "users",
      name: `Participant${numProposals === 1 ? "" : "s"}`,
      value: numProposals ? String(numProposals) : EMPTY_STRING
    },
    {
      icon: "star-full",
      iconColor: "c-report-card-icon-highlight",
      name: "Top CC Score",
      value:
        isComplete && highestScore
          ? `${highestScore.toFixed(NUM_SCORE_DECIMALS)}%`
          : EMPTY_STRING
    },
    {
      icon: "star-half",
      iconColor: "c-report-card-icon-highlight",
      name: "Avg. CC Score",
      value:
        isComplete && averageScore
          ? `${averageScore.toFixed(NUM_SCORE_DECIMALS)}%`
          : EMPTY_STRING
    }
  ];
};

const WaitForCodeChallenge: ComponentView<State, Msg> = ({ state }) => {
  return (
    <div>
      Participants will be displayed here once this opportunity has reached the
      Code Challenge.
    </div>
  );
};

const ContextMenuCell: View<{
  disabled: boolean;
  loading: boolean;
  proposal: SWUProposalSlim;
  dispatch: Dispatch<Msg>;
}> = ({ disabled, loading, proposal, dispatch }) => {
  switch (proposal.status) {
    case SWUProposalStatus.EvaluatedCodeChallenge:
      return (
        <Link
          button
          symbol_={leftPlacement(iconLinkSymbol("stars"))}
          color="info"
          size="sm"
          disabled={disabled || loading}
          loading={loading}
          onClick={() =>
            dispatch(adt("screenInToTeamScenario" as const, proposal.id))
          }>
          Screen In
        </Link>
      );
    case SWUProposalStatus.UnderReviewTeamScenario:
      return (
        <Link
          button
          symbol_={leftPlacement(iconLinkSymbol("ban"))}
          color="danger"
          size="sm"
          disabled={disabled || loading}
          loading={loading}
          onClick={() =>
            dispatch(adt("screenOutOfTeamScenario" as const, proposal.id))
          }>
          Screen Out
        </Link>
      );
    default:
      return null;
  }
};

interface ProponentCellProps {
  proposal: SWUProposalSlim;
  opportunity: SWUOpportunity;
  disabled: boolean;
}

const ProponentCell: View<ProponentCellProps> = ({
  proposal,
  opportunity,
  disabled
}) => {
  const proposalRouteParams = {
    proposalId: proposal.id,
    opportunityId: opportunity.id,
    tab: "codeChallenge" as const
  };
  return (
    <div>
      <Link
        disabled={disabled}
        dest={routeDest(adt("proposalSWUView", proposalRouteParams))}>
        {getSWUProponentName(proposal)}
      </Link>
      {(() => {
        if (!proposal.organization) {
          return null;
        }
        return (
          <div className="small text-secondary text-uppercase">
            {proposal.anonymousProponentName}
          </div>
        );
      })()}
    </div>
  );
};

function evaluationTableBodyRows(
  state: Immutable<State>,
  dispatch: Dispatch<Msg>
): Table.BodyRows {
  const isCompleteCodeChallengeLoading = state.completeCodeChallengeLoading > 0;
  const isScreenToFromLoading = !!state.screenToFromLoading;
  const isLoading = isCompleteCodeChallengeLoading || isScreenToFromLoading;
  return state.proposals.map((p) => {
    const isProposalLoading = state.screenToFromLoading === p.id;
    return [
      {
        className: "text-wrap",
        children: (
          <ProponentCell
            proposal={p}
            opportunity={state.opportunity}
            disabled={isLoading}
          />
        )
      },
      {
        children: (
          <Badge
            text={swuProposalStatusToTitleCase(p.status, state.viewerUser.type)}
            color={swuProposalStatusToColor(p.status, state.viewerUser.type)}
          />
        )
      },
      {
        className: "text-center",
        children: (
          <div>
            {p.challengeScore
              ? `${p.challengeScore.toFixed(NUM_SCORE_DECIMALS)}%`
              : EMPTY_STRING}
          </div>
        )
      },
      ...(state.canProposalsBeScreened
        ? [
            {
              showOnHover: !isProposalLoading,
              className: "text-right text-nowrap",
              children: (
                <ContextMenuCell
                  dispatch={dispatch}
                  proposal={p}
                  disabled={isLoading}
                  loading={isProposalLoading}
                />
              )
            }
          ]
        : [])
    ];
  });
}

function evaluationTableHeadCells(state: Immutable<State>): Table.HeadCells {
  return [
    {
      children: "Proponent",
      className: "text-nowrap",
      style: { width: "100%", minWidth: "240px" }
    },
    {
      children: "Status",
      className: "text-nowrap",
      style: { width: "0px" }
    },
    {
      children: "Code Challenge",
      className: "text-nowrap text-center",
      style: { width: "0px" }
    },
    ...(state.canProposalsBeScreened
      ? [
          {
            children: "",
            className: "text-nowrap text-right",
            style: { width: "0px" }
          }
        ]
      : [])
  ];
}

const EvaluationTable: ComponentView<State, Msg> = ({ state, dispatch }) => {
  return (
    <Table.view
      headCells={evaluationTableHeadCells(state)}
      bodyRows={evaluationTableBodyRows(state, dispatch)}
      state={state.table}
      dispatch={mapComponentDispatch(dispatch, (msg) =>
        adt("table" as const, msg)
      )}
    />
  );
};

const view: ComponentView<State, Msg> = (props) => {
  const { state } = props;
  const opportunity = state.opportunity;
  const cardData = makeCardData(opportunity, state.proposals);
  return (
    <div>
      <EditTabHeader opportunity={opportunity} viewerUser={state.viewerUser} />
      <Row className="mt-5">
        <Col xs="12">
          <ReportCardList reportCards={cardData} />
        </Col>
      </Row>
      <div className="border-top mt-5 pt-5">
        <Row>
          <Col
            xs="12"
            className="d-flex flex-column flex-md-row justify-content-md-between align-items-start align-items-md-center mb-4">
            <h4 className="mb-0">Code Challenge Participants</h4>
          </Col>
          <Col xs="12">
            {state.canViewProposals && state.proposals.length ? (
              <EvaluationTable {...props} />
            ) : (
              <WaitForCodeChallenge {...props} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const component: Tab.Component<State, Msg> = {
  init,
  update,
  view,

  getContextualActions: ({ state, dispatch }) => {
    if (!state.canViewProposals || !state.canProposalsBeScreened) {
      return null;
    }
    const isCompleteCodeChallengeLoading =
      state.completeCodeChallengeLoading > 0;
    const isScreenToFromLoading = !!state.screenToFromLoading;
    const isLoading = isCompleteCodeChallengeLoading || isScreenToFromLoading;
    return adt("links", [
      {
        children: "Complete Code Challenge",
        symbol_: leftPlacement(iconLinkSymbol("code-outline")),
        color: "primary",
        button: true,
        loading: isCompleteCodeChallengeLoading,
        disabled: (() => {
          // At least one proposal already screened in.
          return (
            isLoading ||
            !(
              canSWUOpportunityBeScreenedInToTeamScenario(state.opportunity) &&
              state.proposals.reduce(
                (acc, p) =>
                  acc || p.status === SWUProposalStatus.UnderReviewTeamScenario,
                false as boolean
              )
            )
          );
        })(),
        onClick: () =>
          dispatch(adt("showModal", adt("completeCodeChallenge")) as Msg)
      }
    ]);
  },

  getModal: (state) => {
    if (!state.showModal) {
      return null;
    }
    switch (state.showModal.tag) {
      case "completeCodeChallenge":
        return {
          title: "Complete Code Challenge?",
          onCloseMsg: adt("hideModal"),
          actions: [
            {
              text: "Complete Code Challenge",
              icon: "code-outline",
              color: "primary",
              button: true,
              msg: adt("completeCodeChallenge")
            },
            {
              text: "Cancel",
              color: "secondary",
              msg: adt("hideModal")
            }
          ],
          body: () =>
            "Are you sure you want to complete the evaluation of this opportunity's Code Challenge? You will no longer be able to screen proponents in or out of the Team Scenario."
        };
    }
  }
};
