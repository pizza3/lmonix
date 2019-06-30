import React, { Component } from "react";
import styled from "styled-components";
import SceneTreeContainer from "./SceneTreeContainer";
import _ from "lodash";

export default class SceneLayer extends Component {
  renderSceneLayer = (objArr,num) => {
    return objArr.map((obj, i) => {
      return (
        <>
        {!(i===0&&num>0)?
        <>
          <SceneTreeContainer
          key={`${num}${i}`}
          num={`${num}${i}`}
          name={obj.objName}
          obj={obj}
          active={`${num}${i}` === this.props.activeObj ? true : false}
          {...this.props}
          objPresent={objArr}
          layer={num}
        >
            {this.renderSceneLayer(obj.children,num+1)}
        </SceneTreeContainer>
        </>
        :[]}
        </>
      );
    });
  };
  render() {      
    return (
      <SceneGraphContainer>
        <SceneGraphTitle>Scene</SceneGraphTitle>
        {this.renderSceneLayer(this.props.objPresent,0)}
      </SceneGraphContainer>
    );
  }
}

const SceneGraphContainer = styled.div`
  position: relative;
  float: left;
  width: 191px;
  height: 100%;
  z-index: 90;
  background: #f7f7f7;
  border-right: 2px solid #dbdbdb;
`;

const SceneGraphTitle = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #dbdbdb;
  padding-left: 5px;
  margin-bottom: 5px;
  color: #707070;
  font-weight: bold;
  font-size: 27px;
`;
