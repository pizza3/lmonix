import React, { Component } from "react";
import { Wrapper, Header, Title } from "./styled";
import Number from "../../designLib/Number";
import Switch from "../../designLib/Switch";
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
                    <DropTitle>Camera</DropTitle>
                    <Seperator>
                      <Title>Field of view</Title>
                      <Number
                        onChange={context.setCameraConfig}
                        value={context.config.camera.fov}
                        Width={"100px"}
                        name="fov"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>Far</Title>
                      <Number
                        onChange={context.setCameraConfig}
                        value={context.config.camera.far}
                        Width={"100px"}
                        name="far"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>Near</Title>
                      <Number
                        onChange={context.setCameraConfig}
                        value={context.config.camera.near}
                        Width={"100px"}
                        name="near"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>WASD Controls</Title>
                      <Switch
                        onChange={context.setCameraConfig}
                        checked={context.config.camera["wasd-controls-enabled"]}
                        name="wasd-controls-enabled"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>Look Controls</Title>
                      <Switch
                        onChange={context.setCameraConfig}
                        checked={context.config.camera["look-controls-enabled"]}
                        name="look-controls-enabled"
                      />
                    </Seperator>
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
  margin-right: 6px;
`;

const Container = styled.div`
  width: 248px;
  position: relative;
  height: auto;
  border-radius: 4px;
  z-index: 100;
  padding-bottom: 15px;
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
  font-size: 27px;
  padding-left: 5px;
`;

const Seperator = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  padding: 8px;
  margin-top: 10px;
`;
