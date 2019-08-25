import React, { Component } from "react";
import { Wrapper, Header, Title } from "./styled";
import { config } from "../../assets/icon";
import styled from "styled-components";
import ThreeContext from "../../context/ThreeContext";
import Trigger from "rc-trigger";

export default class Camera extends Component {
  render() {
    return (
      <ThreeContext.Consumer>
        {context => (
          <Wrapper>
            <Header>
              <Title>Camera</Title>
              <Trigger
                action={["click"]}
                popup={
                  <Container>
                    <DropTitle>Configure</DropTitle>
                    <Title>Field of view</Title>
                  </Container>
                }
                prefixCls="dropdown"
                popupAlign={{
                  points: ["tl", "tr"],
                  offset: [10, 0]
                }}
              >
                <Config
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  {config}
                </Config>
              </Trigger>
            </Header>
          </Wrapper>
        )}
      </ThreeContext.Consumer>
    );
  }
}

const Config = styled.svg`
  float: right;
  width: 21px;
  position: relative;
`;

const Container = styled.div`
  width: 248px;
  position: relative;
  height: 295px;
  border-radius: 4px;
  z-index: 100;
  /* padding: 15px; */
  background: #1b1b1b;
  border: 2px solid #2d2d2d;
`;

const DropTitle = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #2d2d2d;
  color: #ececec;
  font-weight: bold;
  font-size:27px;
`;
