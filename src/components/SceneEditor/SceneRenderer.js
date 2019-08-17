import React, { Component } from "react";
import styled from "styled-components";

export default class SceneRenderer extends Component {
  componentDidMount() {
    this.props.renderSceneOnMount();
    document
      .getElementById("SceneRenderer")
      .addEventListener("resize", this.props.handleResize, false);
  }
  render() {
    return (
      <SceneRendererContainer
        id="SceneRenderer"
        onMouseLeave={this.props.handleLeave}
        onMouseEnter={this.props.handleOver}
        objPresent={this.props.objPresent}
      />
    );
  }
}

const SceneRendererContainer = styled.div`
  position: fixed;
  float: left;
  width: ${props => (props.objPresent ? "calc(100% - 232px)" : "100%")};
  height: 100%;
  z-index: 89;
  background: #1b1b1b;
`;
