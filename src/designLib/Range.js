import React from "react";
import styled from "styled-components";

const Range = props => {
  return (
    <RangeStyle
      className="slider"
      id="opacity"
      data-name={props.name || ""}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const RangeStyle = styled.input`
  -webkit-appearance: none;
  background-color: #2f79ef;
  border: 1px solid #ffffff;
  width: 139px;
  float: right;
  height: 4px;
  margin-top: 10px;
  border-radius: 13px;
  margin-right: 7px;
  outline: 0;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #ffffff;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 0px 7px -2px rgba(0, 0, 0, 1);
    transition: 0.3s ease-in-out;
  }

  ::-webkit-slider-thumb:active {
    transform: scale(1.3);
  }
`;

export default Range;
