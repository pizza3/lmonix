import React, { Component } from "react";
import styled from "styled-components";
import SceneRenderer from "./SceneRenderer";
import PropertiesEditor from "./Properties/PropertiesEditor";
import SceneController from "./SceneController";

export default class SceneEditor extends Component {
  componentWillUnmount() {
    this.props.stopanimateScene();
  }
  render() {
    const objPresent = this.props.objPresent.length;
    return (
      <SceneEditorContainer>
        <SceneEditorContainerScroll id="customScrollbar">
          <SceneController {...this.props} />
          <SceneRenderer
            renderSceneOnMount={this.props.renderSceneOnMount}
            handleLeave={this.props.handleLeave}
            handleOver={this.props.handleOver}
            objPresent={objPresent}
          />
          {objPresent ? (
            <PropertiesEditor
              {...this.props}
              changeObjectProp={this.props.changeObjectProp}
            />
          ) : (
            []
          )}
        </SceneEditorContainerScroll>
      </SceneEditorContainer>
    );
  }
}

const SceneEditorContainer = styled.div`
  position: relative;
  width: calc(100% - 232px);
  height: calc(100vh - 37px);
  z-index: 90;
  margin-left: 232px;
  margin-top: 37px;
  overflow: hidden;
`;

const SceneEditorContainerScroll = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 37px);
    overflow: auto;
`;
