import React from "react";
import styled from "styled-components";

const Number = props => {
  return <Input type="number" style={props.style||{}} value={props.value} onChange={props.onChange} data-name={props.name||""} Width={props.Width} />;
};

const Input = styled.input`
  width: ${props=>props.Width?`${props.Width}px`:`36px`};
  height: 25px;
  border: 2px solid #2d2d2d !important;
  background: #2d2d2d;
  border-radius: 3px !important;
  font-size: 9px;
  font-weight: 600;
  color: #737373;
  float: right;
  margin-right: 6px;
  &:focus {
    outline: none;
    background: #4f74f9 !important;
    color: #fff !important;
    border: 2px solid #4f74f9 !important;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Number;
