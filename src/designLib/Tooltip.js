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
}

export default class Tooltip extends Component {
  render() {
    const { name, children, align } = this.props
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
