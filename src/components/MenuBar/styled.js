import React from "react";
import styled from "styled-components";


export const Text = styled.div`
  font-size: 27px;
  font-weight: 700;
  position: absolute;
  color: #717171;
  margin-left: 2px;
  margin-top: -4px;
  font-family: monospace;
`

export const MenuContainer = styled.div`
  position: fixed;
  width: 41px;
  height: calc(100vh - 37px);
  margin-top: 37px;
  z-index: 90;
  background: #1b1b1b;
  border-right: 2px solid #2d2d2d;
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 9px;
  margin-top: 17px;
  overflow: hidden;
`;

export const ImgContainerSvg = styled.svg`
  position: relative;
  width: 20px;
  margin-left: 9px;
  margin-top: 17px;
`;

export const ImgContainerCircleSvg = styled.svg`
  position: relative;
  width: 20px;
  margin-left: 9px;
  margin-top: 17px;
`;

export const ImgContainerAbsSvg = styled.svg`
  position: absolute;
  width: 20px;
  bottom: ${props => props.bottom + "px"};
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
`;
