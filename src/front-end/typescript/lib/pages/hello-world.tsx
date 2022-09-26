import { makePageMetadata } from "front-end/lib";
import { Route, SharedState } from "front-end/lib/app/types";
import {
  ComponentView,
  GlobalComponentMsg,
  PageComponent,
  PageInit,
  Update
} from "front-end/lib/framework";
import React from "react";
import { Col, Row } from "reactstrap";
import { ADT } from "shared/lib/types";

export type RouteParams = null;

export interface State  {
  counter: number;
}

export type Msg = GlobalComponentMsg<ADT<"noop">, Route>;

const init: PageInit<RouteParams, SharedState, State, Msg> = async () => {
  return {
    counter: 0
  };
};

const update: Update<State, Msg> = ({ state, msg }) => {
  return [state];
};

const view: ComponentView<State, Msg> = () => {
  return (
    <div>
      <Row className="mb-3">
        <Col xs="12">
          <h1>Hello World</h1>
        </Col>
      </Row>
    </div>
  );
};

export const component: PageComponent<RouteParams, SharedState, State, Msg> = {
  init,
  update,
  view,
  getMetadata() {
    return makePageMetadata("Hello World");
  }
};
