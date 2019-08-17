import React, { Component } from "react";
import styled from "styled-components";
import SceneRenderer from "./SceneRenderer";
import PropertiesEditor from "../Properties/PropertiesEditor";
import SceneController from "./SceneController";

export default class SceneEditor extends Component {
  componentWillUnmount() {
    this.props.stopanimateScene();
  }
  render() {
    const {
      transformControls,
      toggleGridMesh,
      isGrid,
      renderSceneOnMount,
      handleLeave,
      handleOver,
      handleResize,
      active,
      replaceGeometry,
      objPresent,
      changeObjectProp,
      stopanimateScene,
      removeObject3D
    } = this.props;
    const isobjPresent = objPresent.length;
    return (
      <SceneEditorContainer>
        <SceneEditorContainerScroll id="customScrollbar">
          <SceneController
            transformControls={transformControls}
            toggleGridMesh={toggleGridMesh}
            isGrid={isGrid}
          />
          <SceneRenderer
            renderSceneOnMount={renderSceneOnMount}
            stopanimateScene={stopanimateScene}
            handleLeave={handleLeave}
            handleOver={handleOver}
            handleResize={handleResize}
            objPresent={objPresent}
            removeObject3D={removeObject3D}
          />
          {isobjPresent ? (
            <PropertiesEditor
              {...this.props}
              active={active}
              replaceGeometry={replaceGeometry}
              objPresent={objPresent}
              changeObjectProp={changeObjectProp}
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
