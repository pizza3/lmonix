import React, { Component } from "react";
import styled from "styled-components";
import SceneTree from "./SceneTree";
import _ from "lodash";
import ThreeContext from "../../ThreeContext";

export default class SceneLayer extends Component {
  state={
  }

  setNewName = (oldName)=>{
    let lastChars = oldName.slice(oldName.length-2)
    if(lastChars[0]==='-'&&Number("3")){

    }

  }
  componentDidMount(){
    this.setNames(this.props.objPresent,0)
  }

  componentDidUpdate(prevProps){
    const {objPresent}=this.props
    if(!_.isEqual(objPresent,prevProps.objPresent)){
      this.setNames(this.props.objPresent,0)
    }
  }

  setNames = (objPresent, num)=>{
  }
  renderSceneLayer = (objArr, num) =>
    _.map(objArr, (obj, i) => {
      return (
        <ThreeContext.Consumer key={`${obj.uuid}-Consumer`}>
          {context =>
            !(i === 0 && num > 0) ? (
              <>
                <SceneTree
                  key={obj.uuid}
                  num={`${num}${i}`}
                  name={obj.name.length?obj.name:obj.objName}
                  obj={obj}
                  objPresent={objArr}
                  layer={num}
                  active={context.active}
                  updateActiveDrilldown={context.updateActiveDrilldown}
                  setActiveObj={context.setActiveObj}
                  activeDrilldown={context.activeDrilldown}
                  changeObjectProp={context.changeObjectProp}
                  currentNames={this.state.currentNames}
                >
                  {this.renderSceneLayer(obj.children, num + 1)}
                </SceneTree>
              </>
            ) : (
              []
            )
          }
        </ThreeContext.Consumer>
      );
    });

  render() {
    return (
      <SceneGraphContainer>
        <SceneGraphTitle>Scene</SceneGraphTitle>
        <Container id="customScrollbar">
          {this.renderSceneLayer(this.props.objPresent, 0)}
        </Container>
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
  color: #707070;
  font-weight: bold;
  font-size: 27px;
`;

const Container = styled.div`
  margin-top: 35px;
  height: calc(100% - 35px);
  overflow: auto;
  padding-top: 10px;
  width: 191px;
`;
