import React, { Component } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar/index";
import SceneLayer from "./SceneGraph/SceneLayer";
import SceneRenderer from "./SceneRenderer";
import PropertiesEditor from "./Properties/PropertiesEditor";
import SceneController from "./SceneController";
import SceneGeneral from "./SceneGeneral";

export default class SceneEditor extends Component {
  state = {
    setMode: true
  };
  changeSetMode = setMode => {
    this.setState({
      setMode
    });
  };

  componentWillUnmount() {
    this.props.stopanimateScene();
  }

  render() {    
    const { active, objPresent } = this.props;
    const objectsPresent = objPresent.length
    return (
      <SceneEditorContainer>
        <MenuBar
          changeSetMode={this.changeSetMode}
          setMode={this.state.setMode}
          {...this.props}
        />
        {this.state.setMode ? (
          <SceneLayer objPresent={objPresent}/>
        ) : (
          <SceneGeneral {...this.props} />
        )}
        <SceneController {...this.props} />
        <SceneRenderer
          renderSceneOnMount={this.props.renderSceneOnMount}
          handleLeave={this.props.handleLeave}
          handleOver={this.props.handleOver}
        />
        {/* {objectsPresent? */}
          <PropertiesEditor {...this.props} changeObjectProp={this.props.changeObjectProp} />        
        {/* :[]} */}
      </SceneEditorContainer>
    );
  }
}

const SceneEditorContainer = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: calc(100vh - 37px);
  z-index: 90;
  margin-top: 37px;
  overflow: hidden;
`;
