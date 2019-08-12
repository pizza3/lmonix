import React, { Component } from "react";
import { Wrapper, Header, Title } from "./styled";
import Switch from "../../designLib/Switch";
import ThreeContext from "../../context/ThreeContext";
export default class Cursor extends Component {
  render() {
    return (
      <ThreeContext.Consumer>
        {context => (
          <Wrapper>
            <Header>
              <Title>Cursor</Title>
              <Switch checked={context.isCursor} onChange={context.setCursor} />
            </Header>
          </Wrapper>
        )}
      </ThreeContext.Consumer>
    );
  }
}
