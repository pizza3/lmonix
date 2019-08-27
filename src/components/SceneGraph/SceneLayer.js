import React, { Component } from "react";
import {Svg, Text, SceneGraphContainer, SceneGraphTitle, Container} from './styled'
import SceneTree from "./SceneTreeNew";
import _ from "lodash";
import ThreeContext from "../../context/ThreeContext";

const message = (
  <>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
    >
     <path fill="#7b7a7a" d="M91.3,18.7L48.5,5.4L47.1,5l-1.3,0.5l-37.2,15l-2.5,1l0,2.7L5.8,77.4l0,3l2.8,0.9l42.9,13.3l1.4,0.4l1.3-0.5l37.2-15l2.5-1  l0-2.7l0.2-53.1l0-3L91.3,18.7z M53.4,37.9l2-0.8l-2,2L53.4,37.9z M53.4,42l6.8-6.8l2-0.8l-8.7,8.7L53.4,42z M53.4,46l13.5-13.5  l2-0.8L53.4,47.2L53.4,46z M53.4,50.1l20.3-20.3l2-0.8L53.4,51.2L53.4,50.1z M53.4,54.1L80.4,27l2-0.8l-29,29L53.4,54.1z M53.3,58.1  l33.8-33.8l2-0.8L53.3,59.3L53.3,58.1z M53.2,86.4l36.3-36.3l0,1.2L53.2,87.6L53.2,86.4z M53.3,83.5l0-1.2l36.3-36.3l0,1.2  L53.3,83.5z M53.3,79.5l0-1.2L89.6,42l0,1.2L53.3,79.5z M53.3,75.5l0-1.2L89.6,38l0,1.2L53.3,75.5z M53.3,71.4l0-1.2l36.3-36.3  l0,1.2L53.3,71.4z M53.3,67.4l0-1.2l36.3-36.3l0,1.2L53.3,67.4z M53.3,63.4l0-1.2l36.3-36.3l0,1.2L53.3,63.4z M13,24.2l34.3-13.9  l39.8,12.4L52.9,36.5L13,24.2z M54,89.7l35.6-35.6l0,1.2L56,88.9L54,89.7z M83,78l-2,0.8l8.5-8.5l0,1.2L83,78z M89.5,74.3l0,1  L87.7,76L89.5,74.3z M76.2,80.7l-2,0.8l15.3-15.3l0,1.2L76.2,80.7z M69.5,83.4l-2,0.8l22-22l0,1.2L69.5,83.4z M62.7,86.2l-2,0.8  l28.8-28.8l0,1.2L62.7,86.2z"/>
    </Svg>
    <Text>Add basic object's and other entitie's by selecting them from side menubar.</Text>
  </>
);



export default class SceneLayer extends Component {
  state={
    isDrag:false,
    dragObj:null,
    newParent:null
  }

  resetState=()=>{
    this.setState({
      isDrag:false,
      dragObj:null,
      newParent:null
    }) 
  }

  setDragObj = (obj)=>{
      this.setState({
        dragObj:obj,
        isDrag:true
      })       
  }

  handleUp = ()=>{    
    const {isDrag, dragObj,newParent} =  this.state
    const { paste3DObject } = this.props
    if(isDrag){
      this.setState({
        dragObj:null,
        isDrag:false,
        newParent:null
      },()=>{
        if(newParent!==null&&dragObj.uuid!==newParent.uuid){
          paste3DObject(dragObj,newParent, true, false)
        }
      })
    }
  }

  setParent = (obj)=>{
    this.setState({
      newParent:obj
    })
  }

  renderSceneLayer = (objArr, num) =>
    _.map(objArr, (obj, i) => {
      return (
        <div key={`${obj.uuid}-Consumer`}>
          {!(i === 0 && num > 0) ? (
            <ThreeContext.Consumer>
               {context => (
                  <SceneTree
                    key={obj.uuid}
                    num={`${num}${i}`}
                    name={obj.name.length ? obj.name : obj.objName}
                    obj={obj}
                    objPresent={objArr}
                    layer={num}
                    active={context.active}
                    updateActiveDrilldown={context.updateActiveDrilldown}
                    setActiveObj={context.setActiveObj}
                    activeDrilldown={context.activeDrilldown}
                    changeObjectProp={context.changeObjectProp}
                    setDragObj={this.setDragObj}
                    isDrag={this.state.isDrag}
                    setParent={this.setParent}
                    resetState={this.resetState}
                  >
                  {this.renderSceneLayer(obj.children, num + 1)}
                </SceneTree>
              )}
            </ThreeContext.Consumer>
          ) : (
            []
          )}
        </div>
      );
    });

  render() {
    const { objPresent } = this.props;
    return (
      <SceneGraphContainer onMouseUp={this.handleUp}>
        <SceneGraphTitle>Scene</SceneGraphTitle>
        <Container id="customScrollbar">
          {objPresent.length
            ? this.renderSceneLayer(objPresent, 0)
            : message}
        </Container>
      </SceneGraphContainer>
    );
  }
}

