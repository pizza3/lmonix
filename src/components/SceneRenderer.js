import React, { Component } from "react";
import styled from "styled-components";

export default class SceneRenderer extends Component {
  componentDidMount() {
    this.props.renderSceneOnMount();
  }

  render() {
    return (
      <SceneRendererContainer
        id="SceneRenderer"
        onMouseLeave={this.props.handleLeave}
        onMouseEnter={this.props.handleOver}
      />
    );
  }
}

const SceneRendererContainer = styled.div`
  position: relative;
  float: left;
  width: calc(100% - 466px);
  height: 100%;
  z-index: 100;
  background: #f7f7f7;
`;
