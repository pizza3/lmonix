import React, { Component } from "react";
import styled from "styled-components";
import AnimInfo from "./AnimInfo";
import _ from "lodash";

export default class Animate extends Component {
  state = {};

  render() {
    const { active, updateAnimate } = this.props;
    const animInfos =active? _.map(active.objAnimate, (val, index) => {
      return <AnimInfo key={index} name={val.name} data={val} index={index} updateAnimate={updateAnimate} active={active}/>;
    }):[];
    return (
      <AnimGraphContainer>
        <AnimGraphTitle>Animation</AnimGraphTitle>
        <Container id="customScrollbar">
            {animInfos}
        </Container>
      </AnimGraphContainer>
    );
  }
}

const AnimGraphContainer = styled.div`
    position: relative;
    float: left;
    width: 231px;
    height: calc(100vh - 37px);
    z-index: 90;
    background: #f7f7f7;
    margin-top: 37px;
`;

const AnimGraphTitle = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #dbdbdb;
  padding-left: 5px;
  color: #707070;
  font-weight: bold;
  font-size: 27px;
`;

const Container = styled.div`
  height: calc(100% - 35px);
  overflow: auto;
  width: 100%;
`;
