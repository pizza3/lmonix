import React from "react";
import styled from "styled-components";

export const SceneGraphContainer = styled.div`
  position: fixed;
  float: left;
  width: 191px;
  height: calc(100vh - 37px);
  margin-top: 37px;
  z-index: 90;
  background: #1b1b1b;
  border-right: 2px solid #2d2d2d;
  margin-left: 41px;
`;

export const SceneGraphTitle = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #2d2d2d;
  padding-left: 5px;
  color: #ececec;
  font-weight: bold;
  font-size: 27px;
`;

export const Container = styled.div`
  margin-top: 35px;
  height: calc(100% - 35px);
  overflow: auto;
  padding-top: 10px;
  width: 191px;
`;

export const Svg = styled.svg`
    width: 53px;
    position: relative;
    margin-left: 66px;
    margin-top: 27px;
`;

export const Text = styled.div`
    text-align: center;
    font-size: 9px;
    padding: 0px 14px 0px 14px;
    color: #a5a5a5;
`