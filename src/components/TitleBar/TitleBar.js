import React, { Component } from "react";
import styled from "styled-components";
import { run, info } from "../../assets/icon";
import LocalServer from "./LocalServer";
import Docs from "./Docs";
import { Link } from "react-router-dom";
import Trigger from "rc-trigger";
import Tooltip from "../../designLib/Tooltip";

export default class TitleBar extends Component {
  state = {
    title: "untitled*"
  };
  render() {
    return (
      <TitleContainer id="titleBar">
        <TitleOverlay />
        <Link to="/">
          <TitleLink active={this.props.activeRoute === "/" ? 3 : 0}>
            Design
          </TitleLink>
        </Link>
        <Link to="/code">
          <TitleLinkCode active={this.props.activeRoute === "/code" ? 3 : 0}>
            Prototype
          </TitleLinkCode>
        </Link>
        <Title>{this.props.title}</Title>
        <Tooltip name="Docs" align="bottom">
          <Trigger
            action={["click"]}
            popup={
              <Docs/>
            }
            prefixCls="dropdown"
            popupAlign={{
              points: ["bc", "tl"],
              offset: [-230, 30]
            }}
          >
            <SvgContainer
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {info()}
            </SvgContainer>
          </Trigger>
        </Tooltip>
        <Tooltip name="Preview" align="bottom">
          <Trigger
            action={["click"]}
            popup={
              <LocalServer
                location={this.props.title}
                ip={this.props.localIP}
              />
            }
            prefixCls="dropdown"
            popupAlign={{
              points: ["bc", "tl"],
              offset: [-230, 30]
            }}
          >
            <SvgContainer
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {run}
            </SvgContainer>
          </Trigger>
        </Tooltip>
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
  height: 20px;
  margin-top: 8px;
  margin-right: 23px;
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
