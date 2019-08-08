import React, { Component } from "react";
import styled from "styled-components";
import { walk, grid, scale, translate, rotate } from "../assets/icon";
import Trigger from "rc-trigger";

export default class SceneController extends Component {
  state = {
    active: true,
    activeLogo: 3
  };
  handleTransform = val => {
    switch (val) {
      case "translate":
        this.props.transformControls.setMode("translate");
        this.setState({
          activeLogo: 3
        });
        break;
      case "rotate":
        this.props.transformControls.setMode("rotate");
        this.setState({
          activeLogo: 2
        });
        break;
      case "scale":
        this.props.transformControls.setMode("scale");
        this.setState({
          activeLogo: 1
        });
        break;
      case "walk":
        // this.props.transformControls.setMode("scale");
        this.setState({
          activeLogo: 0
        });
        break;
      default:
        this.props.transformControls.setMode("translate");
    }
  };

  render() {
    const { activeLogo } = this.state;
    return (
      <SceneControllerContainer>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Free Roam</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <SelectController
            onClick={() => {
              this.handleTransform("walk");
            }}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.449 10.845">
              {walk()}
            </Svg>
            <Img src={walk} />
          </SelectController>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Grid</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <SelectController id="grid">
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.151 10.151">
              {grid()}
            </Svg>
          </SelectController>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Scale</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <SelectController
            active={activeLogo === 1} 
            onClick={() => {
              this.handleTransform("scale");
            }}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.452 10.469">
              {scale(activeLogo === 1 ? "#ffffff" : "#707070")}
            </Svg>
          </SelectController>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Rotate</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <SelectController
           active={activeLogo === 2} 
            onClick={() => {
              this.handleTransform("rotate");
            }}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.133 13.127">
              {rotate(activeLogo === 2 ? "#ffffff" : "#707070")}
            </Svg>
            <Img src={rotate} />
          </SelectController>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Translate</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <SelectController
            active={activeLogo === 3} 
            onClick={() => {
              this.handleTransform("translate");
            }}
          >
    
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.634 13.634">
              {translate(activeLogo === 3 ? "#ffffff" : "#707070")}
            </Svg>
          </SelectController>
        </Trigger>
      </SceneControllerContainer>
    );
  }
}

const SelectController = styled.div`
  position: relative;
  width: 33px;
  height: 33px;
  background: ${props=>props.active?'#2F79EF':'#f7f7f7'};
  border-top: 2px solid #dbdbdb;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  &:hover {
    background : ${props=>props.active?'#1a66e0':'#dbdbdb'};
  }
`;

const Svg = styled.svg`
  position: absolute;
  width: 13px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

const Img = styled.img`
  position: absolute;
  width: 13px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

const TooltipOverlay = styled.div`
  background: #000;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  left: 0%;
  top: 0%;
  z-index: -1;
`;

const TooltipText = styled.div`
  z-index: 1;
  color: white;
  position: relative;
`;

const TooltipBody = styled.div`
  width: auto;
  height: auto;
  padding: 7px;
  box-sizing: content-box;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  font-weight: 600;
  font-size: 10px;
`;

const SceneControllerContainer = styled.div`
  position: fixed;
  z-index: 102;
  width: 37px;
  height: 166px;
  overflow: auto;
  left: 235px;
  border: 2px solid #e0e0e0;
  border-top: none;
  border-radius: 4px;
  margin: 16px;
`;