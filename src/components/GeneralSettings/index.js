import React, { Component } from "react";
import styled from "styled-components";
import Cursor from "./Cursor";
import DefaultLights from "./DefaultLights";
import Camera from "./Camera";


export default class Index extends Component {
  render() {
    return (
      <div>
        <Title>Settings</Title>
        <Cursor/>
        <DefaultLights/>
        <Camera/>
      </div>
    );
  }
}

const Title = styled.div`
  position: relative;
  float: left;
  color: #404040;
  font-size: 17px;
  padding-left: 5px;
  font-weight: 700;
  width: 100%;
`;
