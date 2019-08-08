import React, { Component } from "react";
import { image, model, box, general, sky, sun, layer } from "../../assets/icon";
import {MenuContainer, TooltipBody, TooltipOverlay, TooltipText, ImgContainer,  ImgContainerSvg, ImgContainerCircleSvg, Text, ImgContainerAbsSvg} from './styled'
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
  addModel =  obj => {
    this.props.addInScene(obj);
  };
  render() {
    const { scene, addInScene } = this.props;
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
            {sky()}
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
              AddText(scene, addInScene);
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
            {model()}
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
