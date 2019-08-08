import React from "react";
import styled from "styled-components";


export const Container = styled.div`
position: relative;
float: left;
width: 100%;
height: auto;
padding-bottom: 18px;
`;
export const Title = styled.div`
position: relative;
float: left;
color: #969696;
font-size: 10px;
margin-left: 9px;
margin-top: 4px;
font-weight: 700;
`;

export const PropertiesEditorContainer = styled.div`
  position: relative;
  float: right;
  width: 234px;
  height: auto;
  min-height:100%;
  z-index: 90;
  background: #f7f7f7;
  border-left: 2px solid #dbdbdb;
`;

export const PropertiesEditorTitle = styled.div`
  position: fixed;
  float: left;
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #dbdbdb;
  padding-left: 5px;
  color: #707070;
  font-weight: bold;
  font-size: 27px;
  margin-bottom: 13px;
  z-index: 1;
  background: #f7f7f7;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 2px solid #dbdbdb;
  margin-bottom: 20px;
  height: auto;
  float: left;
  `;

export const ScrollBarContainer = styled.div`
    margin-top: 35px;
    position: relative;
    height: auto;
    overflow: visible;
    padding-top: 18px;
`;
