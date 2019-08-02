import React, { Component } from "react";
import styled from "styled-components";
import walk from "../assets/walk.svg";
import grid from "../assets/grid.svg";
import scale from "../assets/scale.svg";
import rotate from "../assets/rotate.svg";
import translate from "../assets/translate.svg";
import walkWhite from "../assets/walkWhite.svg";
import scaleWhite from "../assets/scaleWhite.svg";
import rotateWhite from "../assets/rotateWhite.svg";
import translateWhite from "../assets/translateWhite.svg";
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
    const logo = [walkWhite, scaleWhite, rotateWhite, translateWhite];
    const SceneControllerContainer = styled.div`
      position: absolute;
      z-index: 102;
      width: 37px;
      height: 166px;
      overflow: auto;
      left: 232px;
      border: 2px solid #e0e0e0;
      border-top: none;
      border-radius: 4px;
      margin: 16px;
    `;
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
            active={this.state.active}
            onClick={() => {
              this.handleTransform("walk");
            }}
          >
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
        <SelectController id="grid" active={this.state.active}>
          <Img src={grid} />
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
          active={this.state.active}
          onClick={() => {
            this.handleTransform("scale");
          }}
        >
          <Img src={scale} />
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
          active={this.state.active}
          onClick={() => {
            this.handleTransform("rotate");
          }}
        >
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
          active={this.state.active}
          onClick={() => {
            this.handleTransform("translate");
          }}
        >
          <Img src={translate} />
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
  background: #f7f7f7;
  border-top: 2px solid #dbdbdb;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #dbdbdb;
  }
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
