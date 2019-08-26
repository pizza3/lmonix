import React, { Component } from "react";
import { Wrapper, Header, Title } from "./styled";
import Number from "../../designLib/Number";
import Switch from "../../designLib/Switch";
import Select from "../../designLib/Select";
import { config } from "../../assets/icon";
import styled from "styled-components";
import ThreeContext from "../../context/ThreeContext";
import Trigger from "rc-trigger";
import _ from "lodash";
import ColorPicker, { HexToRgb } from "../../designLib/ColorPicker";

const fogTypes = ["linear", "exponential"];

export default class Fog extends Component {
  getTextColor = (r, g, b) => {
    // check calculates Luminance
    var check = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return check < 0.5 ? 'black' : 'white';
  }
  render() {
    const options = _.map(fogTypes, val => {
      return (
        <option key={val} value={val}>
          {val}
        </option>
      );
    });
    return (
      <ThreeContext.Consumer>
        {context => {
          const color = HexToRgb(context.config.fog.color)    
          const colorText = this.getTextColor(color[0],color[1],color[2])          
          return <Wrapper>
            <Header>
              <Title>Fog</Title>
              <Trigger
                action={["click"]}
                popup={
                  <Container>
                    <DropTitle>Fog</DropTitle>
                    <Seperator>
                      <Title>Enabled</Title>
                      <Switch
                        onChange={context.setFogConfig}
                        checked={context.config.fog.enabled}
                        name="enabled"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>Type</Title>
                      <Select
                        value={context.config.fog.type}
                        onChange={context.setFogConfig}
                        options={options}
                        name="type"
                      />
                    </Seperator>
                    <Seperator>
                      <Title>Color</Title>
                      <Trigger
                        action={["click"]}
                        popup={
                          <ColorPicker
                            onChange={color => {
                              context.setFogConfig({
                                target: { dataset:{name: "color"}, value: color }
                              });
                            }}
                            currentColor={context.config.fog.color}
                          />
                        }
                        prefixCls="dropdown"
                        popupAlign={{
                          points: ["tr", "br"],
                          offset: [0, 5]
                        }}
                        destroyPopupOnHide={true}
                      >
                        <Color background={context.config.fog.color}>
                          <Text color={colorText}>{context.config.fog.color}</Text>
                        </Color>
                      </Trigger>
                    </Seperator>
                    {context.config.fog.type === "linear" ? (
                      <>
                        <Seperator>
                          <Title>Far</Title>
                          <Number
                            onChange={context.setFogConfig}
                            value={context.config.fog.fogfar}
                            Width={"100px"}
                            name="fogfar"
                          />
                        </Seperator>
                        <Seperator>
                          <Title>Near</Title>
                          <Number
                            onChange={context.setFogConfig}
                            value={context.config.fog.fognear}
                            Width={"100px"}
                            name="fognear"
                          />
                        </Seperator>
                      </>
                    ) : (
                      <Seperator>
                        <Title>Density</Title>
                        <Number
                          onChange={context.setFogConfig}
                          value={context.config.fog.density}
                          Width={"100px"}
                          name="density"
                        />
                      </Seperator>
                    )}
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
        }}
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

const Color = styled.div`
  position: relative;
  background: ${props => props.background};
  float: right;
  width: 100px;
  height: 25px;
  border-radius: 4px;
`;


const Text = styled.div`
  /* -webkit-text-stroke-color: #000;
  -webkit-text-stroke-width: 0.02pc; */
  font-size: 12px;
  font-weight: 900;
  color: ${props=>props.color};
  margin: 5px;
`
