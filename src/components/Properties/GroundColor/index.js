import React, { Component } from "react";
import styled from "styled-components";
import Trigger from "rc-trigger";
import ColorPickerDropdown from "../../../designLib/ColorPicker";

export default class GroundColor extends Component {
  state = {
    currentColor: "#fff"
  };
  componentDidUpdate(prevProps) {
    if (prevProps.activeObj !== this.props.activeObj) {
      this.onChange(this.props.active.hashGroundColor);
    }
  }
  onChange = currentColor => {
    this.setState({
      currentColor
    });
    let hex = parseInt(currentColor.replace(/^#/, ""), 16);
    this.props.active.children[0].groundColor.setHex(hex);
    this.props.active.hashGroundColor = currentColor;
  };
  render() {
    return (
      <Container>
        <Title id="Ground">Ground Color</Title>
        <Trigger
          action={["click"]}
          popup={
            <ColorPickerDropdown
              onChange={this.onChange}
              {...this.props}
              addInScene={this.props.addInScene}
              currentColor={this.state.currentColor}
            />
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tr", "bl"],
            offset: [-91, -30]
          }}
          destroyPopupOnHide={true}
          getPopupContainer={() => document.getElementById("Ground")}
        >
          <Input style={{ background: this.state.currentColor }} />
        </Trigger>
      </Container>
    );
  }
}

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
const Input = styled.div`
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
