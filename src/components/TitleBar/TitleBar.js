import React, { Component } from "react";
import styled from "styled-components";
import { run } from "../../assets/icon";
import LocalServer from "./LocalServer";
import { Link } from "react-router-dom";
import Trigger from "rc-trigger";

export default class TitleBar extends Component {
  state = {
    title: "untitled*"
  };
  render() {
    return (
      <TitleContainer id="titleBar">
        <TitleOverlay />
        <Link to="/design">
          <TitleLink active={this.props.activeRoute === "/design" ? 3 : 0}>
            Design
          </TitleLink>
        </Link>
        <Link to="/code">
          <TitleLinkCode active={this.props.activeRoute === "/code" ? 3 : 0}>
            Prototype
          </TitleLinkCode>
        </Link>
        <Title>{this.props.title}</Title>
        <Trigger
          action={["click"]}
          popup={
            <div>
              <LocalServer
                location={this.props.title}
                ip={this.props.localIP}
              />
            </div>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["bc", "tl"],
            offset: [-230, 30]
          }}
        >
          <Trigger
            action={["hover"]}
            popup={
              <TooltipBody>
                <TooltipOverlay />
                <TooltipText>Preview</TooltipText>
              </TooltipBody>
            }
            prefixCls="dropdown"
            popupAlign={{
              points: ["tc", "bc"],
              offset: [0, 10]
            }}
          >
            <SvgContainer
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12.109 11.177"
            >
              {run}
            </SvgContainer>
          </Trigger>
        </Trigger>
      </TitleContainer>
    );
  }
}

const TitleContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 37px;
  z-index: 100;
  background: #1b1b1b;
  border-bottom: 2px solid #2d2d2d;
`;

const TitleOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-user-select: none;
  -webkit-app-region: drag;
`;

const SvgContainer = styled.svg`
  position: relative;
  float: right;
  height: 15px;
  margin-top: 10px;
  margin-right: 27px;
`;

const Title = styled.div` 
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: #8a8a8a;
  font-size: 12px;
  font-weight: 600;
  top: 10px;
`;
const TitleLink = styled.div`
  position: relative;
  float: left;
  font-weight: 500;
  color: #707070;
  font-size: 13px;
  margin-right: 15px;
  padding-bottom: 6px;
  border-bottom: ${props => props.active + "px solid #707070"};
  margin-top: 10px;
  margin-left: 85px;
`;
const TitleLinkCode = styled.div`
  position: relative;
  float: left;
  font-weight: 500;
  color: #707070;
  font-size: 13px;
  margin-right: 15px;
  padding-bottom: 6px;
  border-bottom: ${props => props.active + "px solid #707070"};
  margin-top: 10px;
  margin-left: 1px;
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
