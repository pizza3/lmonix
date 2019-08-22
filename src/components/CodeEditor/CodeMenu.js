import React, { Component } from "react";
import styled from "styled-components";
import { refresh, camera } from "../../assets/icon";
import Tooltip from "../../designLib/Tooltip";

export default class CodeMenu extends Component {
  state = {
    showTerm: false
  };

  toggleShowTerm = () => {
    const { showTerm } = this.state;
    this.setState({
      showTerm: !showTerm
    });

    this.props.toggleDevTool(!showTerm);
  };

  render() {
    const { showTerm } = this.state;
    return (
      <Container>
        <Tooltip align="top" name="Devtool">
          <Terminal showTerm={showTerm} onClick={this.toggleShowTerm}>
            >_
          </Terminal>
        </Tooltip>
        <Tooltip align="top" name="Refresh">
          <Terminal>
            <TabIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {refresh()}
            </TabIcon>
          </Terminal>
        </Tooltip>
        <Tooltip align="top" name="Screenshot">
          <Terminal>
            <TabIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {camera()}
            </TabIcon>
          </Terminal>
        </Tooltip>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 37px;
  background: #1b1b1b;
  border-top: 2px solid #2d2d2d;
  padding: 6px;
  border-right: 2px solid #2d2d2d;
`;

const Terminal = styled.div`
  position: relative;
  width: 41px;
  height: 26px;
  float: left;
  text-align: center;
  background: #2d2d2d;
  border-radius: 2px;
  color: #707070;
  font-size: 12px;
  font-weight: 900;
  padding: 4px 0px 0px 0px;
  margin-top: -2px;
  margin-right: 15px;
`;

const TabIcon = styled.svg`
  width: 20px;
`;
