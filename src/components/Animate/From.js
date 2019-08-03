import React, { Component } from "react";
import { PropertyName, PropertyContainer } from "./styled";
import Range from "../../designLib/Range";
import styled from "styled-components";
import ColorPickerDropdown from "../Properties/ColorPicker/ColorPickerDropdown";
import Trigger from "rc-trigger";
export default class From extends Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
    color: "",
    opacity: 1
  };

  transformComp = (name, data, onChange) => {
    return (
      <>
        <Prop>
          Z:
          <Input
            prop="z"
            name={`${name}z`}
            type="number"
            value={data.z}
            onChange={e => {
              onChange(e);
            }}
          />
        </Prop>
        <Prop>
          Y:
          <Input
            prop="y"
            name={`${name}y`}
            type="number"
            value={data.y}
            onChange={e => {
              onChange(e);
            }}
          />
        </Prop>
        <Prop>
          X:
          <Input
            prop="x"
            name={`${name}x`}
            type="number"
            value={data.x}
            onChange={e => {
              onChange(e);
            }}
          />
        </Prop>
      </>
    );
  };

  colorComp = (name, data, onChange) => {
    return (
      <Trigger
        action={["click"]}
        popup={
          <div>
            <ColorPickerDropdown
              onChange={color => {
                onChange({ value: color, name: `${name}color` });
              }}
              currentColor={data}
            />
          </div>
        }
        prefixCls="dropdown"
        popupAlign={{
          points: ["tr", "bl"],
          offset: [-345, -30]
        }}
        destroyPopupOnHide={true}
      >
        <ColorInput style={{ background: data }} />
      </Trigger>
    );
  };

  opacityComp = (name, data, onChange) => {
    return (
      <Range
        min={0.0}
        max={1.0}
        step={0.1}
        value={data}
        name={`${name}opacity`}
        onChange={onChange}
      />
    );
  };

  render() {
    const { name, data, onChange, property } = this.props;
    let propertComp = property==="position"||property==="rotation"||property==="scale"?"transform":property
    return (
      <PropertyContainer>
        <PropertyName>{name}</PropertyName>
        {this[`${propertComp}Comp`](name, data, onChange)}
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

const Container = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: auto;
  padding-bottom: 18px;
`;
const Title = styled.div`
  position: relative;
  float: left;
  color: #969696;
  font-size: 10px;
  margin-left: 9px;
  margin-top: 4px;
  font-weight: 700;
`;
const ColorInput = styled.div`
  position: relative;
  float: right;
  width: 141px;
  height: 25px;
  border-radius: 3px;
  margin-right: 6px;
  font-size: 10px;
  padding: 4px;
  color: #969696;
  cursor: pointer;
`;
