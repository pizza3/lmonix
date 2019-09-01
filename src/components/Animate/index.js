import React, { Component } from "react";
import styled from "styled-components";
import AnimInfo from "./AnimInfo";
import _ from "lodash";

export default class Animate extends Component {
  render() {
    const { active, updateAnimate, deleteAnimate } = this.props;
    const message = (
      <>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 125"
        >
          <path
            fill="#7b7a7a"
            d="M90,40H70V10L36.667,60h20v30L90,40z M49.121,53.333l14.212-21.315v14.649h14.209L63.333,67.981V53.333H49.121z"
          />
          <rect fill="#7b7a7a" x="10" y="53.333" width="20" height="6.667" />
          <rect
            fill="#7b7a7a"
            x="16.667"
            y="40"
            width="23.333"
            height="6.667"
          />
          <rect
            fill="#7b7a7a"
            x="30"
            y="26.667"
            width="16.667"
            height="6.667"
          />
          <rect
            fill="#7b7a7a"
            x="16.667"
            y="66.667"
            width="33.333"
            height="6.666"
          />
        </Svg>
        <Text>
          Add animation to the selected entity, by right clicking > Add
          Animation.
        </Text>
      </>
    );
    const animInfos =
      active?active.objAnimate.length ? (
        <AnimInfo
          deleteAnimate={deleteAnimate}
          updateAnimate={updateAnimate}
          active={active}
          objAnimate={active.objAnimate}
        />
      ): (message) : (message);
    return (
      <AnimGraphContainer>
        <AnimGraphTitle>Animation</AnimGraphTitle>
        <Container>{animInfos}</Container>
      </AnimGraphContainer>
    );
  }
}

const AnimGraphContainer = styled.div`
  position: relative;
  float: left;
  width: 234px;
  height: calc(100vh - 37px);
  z-index: 90;
  background: #1b1b1b;
  margin-top: 37px;
`;

const AnimGraphTitle = styled.div`
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

const Container = styled.div`
  height: calc(100% - 35px);
  overflow: auto;
  width: 100%;
`;

const Svg = styled.svg`
  width: 53px;
  position: relative;
  margin-left: 83px;
  margin-top: 27px;
`;

const Text = styled.div`
  text-align: center;
  font-size: 9px;
  padding: 0px 14px 0px 14px;
  color: #a5a5a5;
`;
