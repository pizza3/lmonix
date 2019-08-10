import React, { Component } from "react";
import { image, model, box, general, sky, sun, layer } from "../../assets/icon";
import {MenuContainer, ImgContainer,  ImgContainerSvg, ImgContainerCircleSvg, Text, ImgContainerAbsSvg} from './styled';
import {
  AddCube,
  AddSky,
  AddAmbientLight,
  AddModel,
  AddText,
  AddCurvedImage,
  AddGroupObj
} from "./AddModel";
import Tooltip from '../../designLib/Tooltip';

export default class MenuBar extends Component {
  addModel =  obj => {
    this.props.addInScene(obj);
  };
  render() {
    const { scene, addInScene } = this.props;
    return (
      <MenuContainer>
        <Tooltip
          align='right'
          name='Basic Objects'
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
        </Tooltip>
        <Tooltip
        align='right'
        name='Basic Lights'
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
        </Tooltip>
        <Tooltip
                align='right'
                name='Sky'
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
        </Tooltip>
        <Tooltip
          align='right'
          name='Text'
        >
          <ImgContainer
            onClick={() => {
              AddText(scene, addInScene);
            }}
          >
            <Text>T</Text>
          </ImgContainer>
        </Tooltip>
        <Tooltip
          align='right'
          name='Images/Videos'
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
        </Tooltip>
        <Tooltip
                  align='right'
                  name='3D Model'
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
        </Tooltip>
        <Tooltip
                          align='right'
                          name='General'

        >
          <ImgContainerAbsSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            bottom={53}
            onClick={() => {
              this.props.changeSetMode(false);
            }}
          >
            {!this.props.setMode ? general("#4f74f9") : general("#707070")}
          </ImgContainerAbsSvg>
        </Tooltip>
        <Tooltip
                 align='right'
                 name='Scene'
        >
          <ImgContainerAbsSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            bottom={14}
            onClick={() => {
              this.props.changeSetMode(true);
            }}
          >
            {this.props.setMode ? layer("#4f74f9") : layer("#707070")}
          </ImgContainerAbsSvg>
        </Tooltip>
      </MenuContainer>
    );
  }
}
