import React, { Component } from "react";
import styled from "styled-components";
import Select from "../../designLib/Select";
import Number from "../../designLib/Number";
import Switch from "../../designLib/Switch";
import _ from "lodash";
import From from "./From";
import { config } from "../../assets/icon";
import { PropertyName, PropertyContainer } from "./styled";
import Trigger from "rc-trigger";
import {
  genericProperties,
  directions,
  easeFuncsList
} from "../Helpers/helpers";
export default class AnimDropdown extends Component {
  // over here we have basic/common props needed for animation
  state = {
    property: "rotation",
    delay: 0,
    duration: 1000,
    direction: "normal",
    ease: "linear",
    loop: true,
    loopValue: 0,
    from: null,
    to: null
  };

  componentDidMount() {
    this.setComponentProp();
  }

  handleChange = e => {
    e.persist();
    const name = e.target.dataset.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  setComponentProp = () => {
    const { data } = this.props;
    const {
      property,
      delay,
      duration,
      direction,
      ease,
      loop,
      loopValue
    } = data;
    let from, to;
    // if(property==='rotation'&&property==='translate'&&property==='rotation'){
    //     from = {
    //         x:
    //     }
    // }
    this.setState({
      property,
      delay,
      duration,
      direction,
      ease,
      loop,
      loopValue
    });
  };

  render() {
    const { property, delay, direction, ease, duration, loop } = this.state;
    const { name, data } = this.props;
    const customStyle={
        background: '#bdbdbd',
        color: '#6d6d6d'
    }
    const propoptions = _.map(genericProperties, (prop, index) => {
      return (
        <optgroup key={index} label={index}>
          {_.map(prop, (val, i) => {
            return (
              <option key={i} value={val}>
                {val}
              </option>
            );
          })}
        </optgroup>
      );
    });
    const diroptions = _.map(directions, prop => {
      return (
        <option key={prop} value={prop}>
          {prop}
        </option>
      );
    });
    const easeOptions = _.map(easeFuncsList, prop => {
      return (
        <option key={prop} value={prop}>
          {prop}
        </option>
      );
    });
    return (
      <AnimContainer>
        <AnimText>{name}</AnimText>
        <Trigger
          action={["click"]}
          popup={
            <AnimConfigDropdown id="customScrollbar">
              <AnimConfigTitle>Property</AnimConfigTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Property</PropertyName>
                  <Select
                    style={customStyle}
                    value={property}
                    onChange={this.handleChange}
                    options={propoptions}
                    name={"property"}
                  />
                </PropertyContainer>

                <From name={"From"} property={property} />
                <From name={"To"} property={property} />
              </AnimConfigSeperator>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Duration</PropertyName>
                  <EntitySymbol>(ms)</EntitySymbol>
                  <Number
                    style={customStyle}
                    value={duration}
                    onChange={this.handleChange}
                    name={"duration"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Delay</PropertyName>
                  <EntitySymbol>(ms)</EntitySymbol>
                  <Number
                    style={customStyle}
                    value={delay}
                    onChange={this.handleChange}
                    name={"delay"}
                  />
                </PropertyContainer>
              </AnimConfigSeperator>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Direction</PropertyName>
                  <Select
                    style={customStyle}
                    value={direction}
                    onChange={this.handleChange}
                    options={diroptions}
                    name={"direction"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Loop</PropertyName>
                  <Switch
                    style={customStyle}
                    value={loop}
                    onChange={this.handleChange}
                    name={"loop"}
                  />
                </PropertyContainer>
              </AnimConfigSeperator>

              <PropertyContainer>
                <PropertyName>Easing</PropertyName>
                <Select
                  style={customStyle}
                  value={ease}
                  onChange={this.handleChange}
                  options={easeOptions}
                  name={"ease"}
                />
              </PropertyContainer>
            </AnimConfigDropdown>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tr", "bl"],
            offset: [-222, 3]
          }}
        >
          <AnimConfigIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            {config}
          </AnimConfigIcon>
        </Trigger>
      </AnimContainer>
    );
  }
}

const AnimContainer = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 32px;
  color: #707070;
  font-weight: 600;
  padding: 3px 7px 1px 1px;
  background: #f1f1f1;
  border-bottom: 2px solid #e0e0e0;
`;
const AnimText = styled.div`
  position: relative;
  float: left;
  font-size: 12px;
  margin: 5px 1px 1px 6px;
`;
const EntitySymbol = styled.div`
  position: relative;
  font-size: 6px;
  float: left;
  margin-top: 4px;
  color: #707070;
`;

const AnimConfigIcon = styled.svg`
  width: 24px;
  float: right;
  padding: 2px;
  position: relative;
  border-radius: 2px;
  background: #e0e0e0;
  &:hover {
    background: #d0d0d0;
  }
`;

const AnimConfigDropdown = styled.div`
  width: 248px;
  position: fixed;
  height: 295px;
  background: #f9f9f9;
  border-radius: 4px;
  border: 2px solid #d4d4d4;
  z-index: 100;
  padding: 7px 7px 15px 7px;
  overflow: auto;
  border-right: none;
  box-shadow: 0px 0px 35px -12px rgba(0, 0, 0, 0.75);
`;

const AnimConfigTitle = styled.div`
  color: #707070;
  font-weight: 800;
  font-size: 26px;
`;

const AnimConfigSeperator = styled.div`
  position: relative;
  float: left;
  background: #dcdcdc;
  border-radius: 3px;
  padding-left: 5px;
  padding-bottom: 7px;
  width: 100%;
  margin-top: 15px;
`;
