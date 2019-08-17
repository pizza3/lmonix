import React, { Component } from "react";
import styled from "styled-components";
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

    this.props.toggleDevTool(!showTerm)
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
  width: 17px;
  height: 17px;
  float: left;
  background: #707070;
  border-radius: 2px;
  color: #252525;
  font-size: 10px;
  font-weight: 900;
  padding: 2px;
  margin-top: 3px;
`;
