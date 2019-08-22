import React, { Component } from "react";
import styled from "styled-components";
import Trigger from "rc-trigger";
import ColorPickerDropdown from "../../../designLib/ColorPicker";
import _ from "lodash";
export default class ColorPicker extends Component {
  state = {
    currentColor: "#fff"
  };
  componentDidMount() {
    this.onChange(this.props.active.hashColor);
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.active.uuid, this.props.active.uuid)) {
      this.onChange(this.props.active.hashColor);
    }
    if(!_.isEqual(prevProps.active.hashColor, this.props.active.hashColor)){ 
      console.log('color changed');
           
      this.onChange(this.props.active.hashColor, false);
    }
  }
  onChange = (currentColor, bool=true) => {
    this.setState({
      currentColor
    });
    let hex = parseInt(currentColor.replace(/^#/, ""), 16);
    if(bool){
      if (this.props.active.objType === "Mesh") {
        this.props.changeObjectProp(currentColor, "color", "colorMaterial");
      } else if (this.props.active.objType === "Light") {
        this.props.changeObjectProp(currentColor, "color", "colorLight");
      }
    }
  };
  render() {
    return (
      <Container>
        <Title id="fill">Fill</Title>
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
          getPopupContainer={() => document.getElementById("fill")}
        >
          <Input style={{ background: this.state.currentColor }}>
            <Text>{this.state.currentColor}</Text>
          </Input>
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


const Text = styled.div`
  -webkit-text-stroke-color: #000;
  -webkit-text-stroke-width: 0.02pc;
  font-size: 12px;
  font-weight: 900;
  color: #fff;
`
