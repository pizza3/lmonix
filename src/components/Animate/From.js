import React, { Component } from "react";
import { PropertyName, PropertyContainer } from "./styled";
import styled from "styled-components";

export default class From extends Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
    color: "",
    opacity: 1
  };

  render() {
    const { name } = this.props;
    const transformComp = (
      <>
        <Prop>
          Z:
          <Input
            prop="z"
            name="z"
            type="number"
            value={this.state.z}
            onChange={this.handleChange}
          />
        </Prop>
        <Prop>
          Y:
          <Input
            prop="y"
            name="y"
            type="number"
            value={this.state.y}
            onChange={this.handleChange}
          />
        </Prop>
        <Prop>
          X:
          <Input
            prop="x"
            name="x"
            type="number"
            value={this.state.x}
            onChange={this.handleChange}
          />
        </Prop>
      </>
    );
    return (
      <PropertyContainer>
        <PropertyName>{name}</PropertyName>
        {transformComp}
      </PropertyContainer>
    );
  }
}

const Prop = styled.div`
  float: right;
  font-size: 11px;
  color: #9d9d9d;
  margin-right: 6px;
`;
const Input = styled.input`
  width: 36px;
  height: 25px;
  border: 2px solid #dbdbdb;
  background: #dbdbdb;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 600;
  color: #737373;
  &:focus {
    outline: none;
    background: #2f79ef;
    color: #fff;
    border: 2px solid #2f79ef;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
