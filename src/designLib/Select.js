import React from "react";
import styled from 'styled-components';


const Select = (props) => {
    return (
        <SelectBox style={props.style||{}} value={props.value} onChange={props.onChange} data-name={props.name||''}>
            {props.options}
        </SelectBox>
    )
}



const SelectBox = styled.select`
  float: right;
  margin-right: 7px;
  width: 141px;
  background: #2d2d2d;
  border: none;
  color: #969696;
  outline: 0;
  height: 25px;
  border-radius: 2px;
  line-height: 10px;
  font-size: 10px;
`;
export default Select

