import * as crud from "back-end/lib/crud";
import * as db from "back-end/lib/db";
import * as affiliationNotifications from "back-end/lib/mailer/notifications/affiliation";
import { inviteToRegister } from "back-end/lib/mailer/notifications/user";
import * as permissions from "back-end/lib/permissions";
import {
  basicResponse,
  JsonResponseBody,
  makeJsonResponseBody,
  nullRequestBodyHandler,
  wrapRespond
} from "back-end/lib/server";
import {
  SupportedRequestBodies,
  SupportedResponseBodies
} from "back-end/lib/types";
import {
  validateAffiliationId,
  validateOrganizationId
} from "back-end/lib/validation";
import { getString } from "shared/lib";
import {
  Affiliation,
  AffiliationMember,
  AffiliationSlim,
  CreateRequestBody as SharedCreateRequestBody,
  CreateValidationErrors,
  DeleteValidationErrors,
  MembershipStatus,
  MembershipType,
  UpdateValidationErrors
} from "shared/lib/resources/affiliation";
import { Organization } from "shared/lib/resources/organization";
import { Session } from "shared/lib/resources/session";
import { UserStatus, UserType } from "shared/lib/resources/user";
import { Id } from "shared/lib/types";
import {
  allValid,
  getInvalidValue,
  getValidValue,
  invalid,
  isInvalid,
  valid
} from "shared/lib/validation";
import * as affiliationValidation from "shared/lib/validation/affiliation";

export interface ValidatedCreateRequestBody {
  user: Id;
  organization: Id;
  membershipType: MembershipType;
  membershipStatus: MembershipStatus;
}

type ValidatedUpdateRequestBody = Id;

type ValidatedDeleteRequestBody = Id;

interface CreateRequestBody
  extends Omit<SharedCreateRequestBody, "membershipType"> {
  membershipType: string;
}

type Resource = crud.Resource<
  SupportedRequestBodies,
  SupportedResponseBodies,
  CreateRequestBody,
  ValidatedCreateRequestBody,
  CreateValidationErrors,
  null,
  null,
  null,
  ValidatedUpdateRequestBody,
  UpdateValidationErrors,
  ValidatedDeleteRequestBody,
  DeleteValidationErrors,
  Session,
  db.Connection
>;

const resource: Resource = {
  routeNamespace: "affiliations",

  readMany(connection) {
    return nullRequestBodyHandler<
      JsonResponseBody<AffiliationSlim[] | AffiliationMember[] | string[]>,
      Session
    >(async (request) => {
      const respond = (
        code: number,
        body: AffiliationSlim[] | AffiliationMember[] | string[]
      ) => basicResponse(code, request.session, makeJsonResponseBody(body));
      // If a query parameter scoping to single org was provided, return affiliations for that org (must be admin or owner for specified org)
      if (request.query.organization) {
        const validatedOrganization = await validateOrganizationId(
          connection,
          request.query.organization,
          request.session,
          false
        );
        if (isInvalid(validatedOrganization)) {
          return respond(404, validatedOrganization.value);
        }
        if (
          !request.session ||
          !(await permissions.readManyAffiliationsForOrganization(
            connection,
            request.session,
            request.query.organization
          ))
        ) {
          return respond(401, [permissions.ERROR_MESSAGE]);
        }
        const dbResult = await db.readManyAffiliationsForOrganization(
          connection,
          validatedOrganization.value.id
        );
        if (isInvalid(dbResult)) {
          return respond(503, [db.ERROR_MESSAGE]);
        }
        return respond(200, dbResult.value);
      } else {
        // Otherwise return all affiliations for the current user
        if (
          !request.session ||
          !permissions.readManyAffiliations(request.session)
        ) {
          return respond(401, [permissions.ERROR_MESSAGE]);
        }
        const dbResult = await db.readManyAffiliations(
          connection,
          request.session.user.id,
          request.session
        );
        if (isInvalid(dbResult)) {
          return respond(503, [db.ERROR_MESSAGE]);
        }
        return respond(200, dbResult.value);
      }
    });
  },

  create(connection) {
    return {
      async parseRequestBody(request) {
        const body: unknown =
          request.body.tag === "json" ? request.body.value : {};
        return {
          userEmail: getString(body, "userEmail"),
          organization: getString(body, "organization"),
          membershipType: getString(body, "membershipType")
        };
      },
      async validateRequestBody(request) {
        const { userEmail, organization, membershipType } = request.body;
        // Attempt to fetch a valid user for the given email
        if (
          !(await permissions.createAffiliation(
            connection,
            request.session,
            organization
          ))
        ) {
          return invalid({
            permissions: [permissions.ERROR_MESSAGE]
          });
        }
        const validatedUserEmail =
          affiliationValidation.validateUserEmail(userEmail);
        if (isInvalid(validatedUserEmail)) {
          return invalid({
            userEmail: validatedUserEmail.value
          });
        }
        const validatedUser = await db.readOneUserByEmail(
          connection,
          validatedUserEmail.value,
          false,
          UserType.Vendor
        );
        const validatedOrganization = await validateOrganizationId(
          connection,
          organization,
          request.session
        );
        const validatedMembershipType =
          affiliationValidation.validateMembershipType(membershipType);
        if (
          allValid([
            validatedUser,
            validatedOrganization,
            validatedMembershipType
          ])
        ) {
          const user = getValidValue(validatedUser, null);
          if (!user) {
            inviteToRegister(
              validatedUserEmail.value,
              validatedOrganization.value as Organization
            );
            return invalid({
              inviteeNotRegistered: [
                "User is not registered, but has been notified."
              ]
            });
          }
          // Only active members can be invited
          if (user.status !== UserStatus.Active) {
            return invalid({
              affiliation: ["Only active members can be invited."]
            });
          }
          // Only vendor type users can be invited
          if (user.type !== UserType.Vendor) {
            return invalid({
              affiliation: ["Only vendors can be invited."]
            });
          }
          // Do not create if there is already an active affiliation for this user/org
          const dbResult = await db.readOneAffiliation(
            connection,
            user.id,
            organization
          );
          if (isInvalid(dbResult)) {
            return invalid({ database: [db.ERROR_MESSAGE] });
          }
          if (dbResult.value) {
            return invalid({
              affiliation: [
                "This user is already a member of this organization."
              ]
            });
          }
          return valid({
            user: user.id,
            organization,
            membershipType: validatedMembershipType.value as MembershipType,
            membershipStatus: MembershipStatus.Pending
          });
        } else {
          return invalid({
            user: getInvalidValue(validatedUser, undefined),
            organization: getInvalidValue(validatedOrganization, undefined),
            membershipType: getInvalidValue(validatedMembershipType, undefined)
          });
        }
      },
      respond: wrapRespond<
        ValidatedCreateRequestBody,
        CreateValidationErrors,
        JsonResponseBody<Affiliation>,
        JsonResponseBody<CreateValidationErrors>,
        Session
      >({
        valid: async (request) => {
          const dbResult = await db.createAffiliation(connection, request.body);
          if (isInvalid(dbResult)) {
            return basicResponse(
              503,
              request.session,
              makeJsonResponseBody({ database: [db.ERROR_MESSAGE] })
            );
          }
          // Notify invited user
          affiliationNotifications.handleUserInvited(dbResult.value);
          return basicResponse(
            201,
            request.session,
            makeJsonResponseBody(dbResult.value)
          );
        },
        invalid: async (request) => {
          if (request.body.affiliation) {
            return basicResponse(
              409,
              request.session,
              makeJsonResponseBody(request.body)
            );
          }
          if (request.body.inviteeNotRegistered) {
            // Use a status code 400 because the response body is a subset of `CreateValidationErrors`
            return basicResponse(
              400,
              request.session,
              makeJsonResponseBody(request.body)
            );
          }
          return basicResponse(
            400,
            request.session,
            makeJsonResponseBody(request.body)
          );
        }
      })
    };
  },

  update(connection) {
    return {
      async parseRequestBody(request) {
        return null;
      },
      async validateRequestBody(request) {
        const validatedAffiliation = await validateAffiliationId(
          connection,
          request.params.id
        );
        if (isInvalid(validatedAffiliation)) {
          return invalid({
            affiliation: getInvalidValue(validatedAffiliation, undefined)
          });
        }
        const existingAffiliation = validatedAffiliation.value;
        if (existingAffiliation.membershipStatus === MembershipStatus.Pending) {
          if (
            !permissions.updateAffiliation(request.session, existingAffiliation)
          ) {
            return invalid({
              permissions: [permissions.ERROR_MESSAGE]
            });
          }
          return valid(existingAffiliation.id);
        }
        return invalid({
          affiliation: ["Membership is not pending."]
        });
      },
      respond: wrapRespond({
        valid: async (request) => {
          const id = request.body;
          const dbResult = await db.approveAffiliation(connection, id);
          if (isInvalid(dbResult)) {
            return basicResponse(
              503,
              request.session,
              makeJsonResponseBody({ database: [db.ERROR_MESSAGE] })
            );
          }
          // Notify organization admin that new member has joined
          affiliationNotifications.handleUserAcceptedInvitation(
            connection,
            dbResult.value
          );
          return basicResponse(
            200,
            request.session,
            makeJsonResponseBody(dbResult.value)
          );
        },
        invalid: async (request) => {
          return basicResponse(
            400,
            request.session,
            makeJsonResponseBody(request.body)
          );
        }
      })
    };
  },

  delete(connection) {
    return {
      async validateRequestBody(request) {
        const validatedAffiliation = await validateAffiliationId(
          connection,
          request.params.id
        );
        if (isInvalid(validatedAffiliation)) {
          return invalid({
            affiliation: validatedAffiliation.value
          });
        }

        const existingAffiliation = validatedAffiliation.value;
        if (
          existingAffiliation.membershipType === MembershipType.Owner &&
          (await db.readActiveOwnerCount(
            connection,
            existingAffiliation.organization.id
          )) === 1
        ) {
          return invalid({
            affiliation: [
              "Unable to remove membership. This is the sole owner for this organization."
            ]
          });
        }

        if (
          !(await permissions.deleteAffiliation(
            connection,
            request.session,
            existingAffiliation
          ))
        ) {
          return invalid({
            permissions: [permissions.ERROR_MESSAGE]
          });
        }

        return valid(existingAffiliation.id);
      },
      respond: wrapRespond({
        valid: async (request) => {
          const affiliationId = request.body;
          const existingAffiliationStatus = getValidValue(
            await db.readOneAffiliationById(connection, affiliationId),
            null
          )?.membershipStatus;
          const dbResult = await db.deleteAffiliation(
            connection,
            affiliationId
          );
          if (isInvalid(dbResult)) {
            return basicResponse(
              503,
              request.session,
              makeJsonResponseBody({ database: [db.ERROR_MESSAGE] })
            );
          }
          // If this was a pending notification rejected by the invited user, notify the org owner of rejected invite
          if (
            existingAffiliationStatus === MembershipStatus.Pending &&
            request.session?.user.id === dbResult.value.user.id
          ) {
            affiliationNotifications.handleUserRejectedInvitation(
              connection,
              dbResult.value
            );
          }
          return basicResponse(
            200,
            request.session,
            makeJsonResponseBody(dbResult.value)
          );
        },
        invalid: async (request) => {
          return basicResponse(
            400,
            request.session,
            makeJsonResponseBody(request.body)
          );
        }
      })
    };
  }
};

export default resource;
