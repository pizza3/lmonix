import React from "react";
import styled from "styled-components";

const Number = props => {
  return <Input type="number" style={props.style||{}} value={props.value} onChange={props.onChange} data-name={props.name||""} Width={props.Width} />;
};

const Input = styled.input`
  width: ${props=>props.Width?`${props.Width}px`:`36px`};
  height: 25px;
  border: 2px solid #dbdbdb !important;
  background: #dbdbdb;
  border-radius: 3px !important;
  font-size: 9px;
  font-weight: 600;
  color: #737373;
  float: right;
  margin-right: 6px;
  &:focus {
    outline: none;
    background: #2f79ef !important;
    color: #fff !important;
    border: 2px solid #2f79ef !important;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Number;
