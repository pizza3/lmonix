import React, { Component } from "react";
import styled from "styled-components";import { image, model, box, general, sky, sun, layer } from "../../assets/icon";
import Trigger from "rc-trigger";
import {
  AddCube,
  AddSky,
  AddAmbientLight,
  AddModel,
  AddText,
  AddCurvedImage,
  AddGroupObj
} from "./AddModel";

export default class MenuBar extends Component {
  addModel = obj => {
    this.props.addInScene(obj);
  };
  render() {
    const { scene, numberOfObj } = this.props;

    return (
      <MenuContainer>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Basic Objects</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => {
              this.addModel(AddCube(scene));
            }}
          >
            {box}
          </ImgContainerSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Basic Lights</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerCircleSvg
            style={{
              transform: 'scale(1.1)'

            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => {
              this.addModel(AddAmbientLight(scene));
            }}
          >
            {sun}
          </ImgContainerCircleSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Sky</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerCircleSvg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            onClick={() => {
              this.addModel(AddSky(scene));
            }}
            alt="General"
          >
            {sky}
          </ImgContainerCircleSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Text</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainer
            onClick={() => {
              this.addModel(AddText(scene));
            }}
          >
            <Text>T</Text>
          </ImgContainer>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Images/Videos</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => {
              this.addModel(AddCurvedImage(scene));
            }}
          >
            {image}
          </ImgContainerSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>3D Model</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => {
              this.addModel(AddModel(scene));
            }}
          >
            {model}
          </ImgContainerSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>General</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerAbsSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            bottom={53}
            onClick={() => {
              this.props.changeSetMode(false);
            }}
          >
            {!this.props.setMode ? general("#2f79ef") : general("#707070")}
          </ImgContainerAbsSvg>
        </Trigger>
        <Trigger
          action={["hover"]}
          popup={
            <TooltipBody>
              <TooltipOverlay />
              <TooltipText>Scene</TooltipText>
            </TooltipBody>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tl", "tc"],
            offset: [20, 0]
          }}
        >
          <ImgContainerAbsSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            bottom={14}
            onClick={() => {
              this.props.changeSetMode(true);
            }}
          >
            {this.props.setMode ? layer("#2f79ef") : layer("#707070")}
          </ImgContainerAbsSvg>
        </Trigger>
      </MenuContainer>
    );
  }
}

const Text = styled.div`
  font-size: 27px;
  font-weight: 700;
  position: absolute;
  color: #717171;
  margin-left: 2px;
  margin-top: -4px;
  font-family: monospace;
`

const MenuContainer = styled.div`
  position: relative;
  float: left;
  width: 41px;
  height: 100%;
  z-index: 90;
  background: #f7f7f7;
  border-right: 2px solid #dbdbdb;
`;

const ImgContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 9px;
  margin-top: 17px;
  overflow: hidden;
`;

const ImgContainerSvg = styled.svg`
  position: relative;
  width: 20px;
  margin-left: 9px;
  margin-top: 17px;
`;

const ImgContainerCircleSvg = styled.svg`
  position: relative;
  width: 20px;
  margin-left: 9px;
  margin-top: 17px;
`;

const ImgContainerAbsSvg = styled.svg`
  position: absolute;
  width: 20px;
  bottom: ${props => props.bottom + "px"};
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
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
