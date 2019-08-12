import React, { Component } from "react";
import Trigger from "rc-trigger";
import styled from "styled-components";

const position = {
  bottom: {
    points: ["tc", "bc"],
    offset: [0, 10]
  },
  right: {
    points: ["tl", "tc"],
    offset: [20, 0]
  }
};

export default class Tooltip extends Component {
  render() {
    const { name, children, align } = this.props;
    return (
      <Trigger
        action={["hover"]}
        popup={
          <TooltipBody>
            <TooltipOverlay />
            <TooltipText>{name}</TooltipText>
          </TooltipBody>
        }
        prefixCls="dropdown"
        popupAlign={position[align]}
      >
        {children}
      </Trigger>
    );
  }
}

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
  box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.75);
  border: 1px solid #000000;
`;

const TooltipOverlay = styled.div`
  background: #464646;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  left: 0%;
  top: 0%;
  z-index: -1;
  border-radius: 4px;
  box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.75);
  border: 1px solid #7d7d7d;
`;

const TooltipText = styled.div`
  z-index: 1;
  color: white;
  position: relative;
`;
