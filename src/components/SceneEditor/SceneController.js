import React, { Component } from "react";
import styled from "styled-components";
import { walk, grid, scale, translate, rotate } from "../../assets/icon";
import Tooltip from '../../designLib/Tooltip'
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
        <Tooltip
          align='right'
          name='Free Roam'
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
        </Tooltip>
        <Tooltip
         align='right'
         name='Grid'
        >
          <SelectController id="grid">
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.151 10.151">
              {grid()}
            </Svg>
          </SelectController>
        </Tooltip>
        <Tooltip
          align='right'
          name='Scale'
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
        </Tooltip>
        <Tooltip
         align='right'
         name='Rotate'
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
        </Tooltip>
        <Tooltip
          align='right'
          name='Translate'
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
        </Tooltip>
      </SceneControllerContainer>
    );
  }
}

const SelectController = styled.div`
  position: relative;
  width: 33px;
  height: 33px;
  background: ${props=>props.active?'#4f74f9':'#1b1b1b'};
  border-top: 2px solid #2d2d2d;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  &:hover {
    background : ${props=>props.active?'#4f74f9':'#1b1b1b'};
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

const SceneControllerContainer = styled.div`
  position: fixed;
  z-index: 102;
  width: 37px;
  height: 166px;
  overflow: auto;
  left: 235px;
  border: 2px solid #2d2d2d;
  border-top: none;
  border-radius: 4px;
  margin: 16px;
`;