import React, { Component } from "react";
import styled from "styled-components";
import Trigger from "rc-trigger";
import ModelDropdown from "./ModelDropdown";
import _ from 'lodash';
import { cross } from "../../../assets/icon";

export default class Model extends Component {
  state = {
    currentModel: "Add Model",
    isModel: false
  };
  componentDidMount() {
    if (
      this.props.active &&
      this.props.active.objModel &&
      this.props.active.objModel.name
    ) {
      this.setState({
        isModel: true,
        currentModel: this.props.active.objModel.name
      });
    }
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.active.objModel,this.props.active.objModel);
    
    if (!_.isEqual(prevProps.active.objModel, this.props.active.objModel)) {
      console.log('obj model');
      
      if (
        this.props.active &&
        this.props.active.objModel &&
        this.props.active.objModel.name
      ) {
        this.setState({
          isModel: true,
          currentModel: this.props.active.objModel.name
        });
      } else {
        this.setState({
          isModel: false
        });
      }
    }
  }
  checkForModel = () => {
    this.setState({
      isModel: true,
      currentModel: this.props.active.objModel.name
    });
  };
  removeModel = () => {
    this.props.removeObject3D();
    this.setState({
      isModel: false,
      currentModel: "Add Model"
    });
    this.props.changeObjectProp(
      {},
      "objModel"
    );
  };
  render() {
    const { currentModel, isModel } = this.state
    const content = this.props.active
    ? this.props.active.objModel
      ? this.props.active.objModel.name
      : currentModel
    : currentModel;
    return (
      <Container>
        <Title>Model</Title>
        <Trigger
          action={["click"]}
          popup={
            <div>
              <ModelDropdown
                {...this.props}
                location={this.props.title}
                addInScene={this.props.addInScene}
              />
            </div>
          }
          prefixCls="dropdown"
          popupAlign={{
            points: ["tr", "bl"],
            offset: [-91, -30]
          }}
        >
          <Input>{isModel ? content : "Add Model"}</Input>
        </Trigger>
        {isModel ? (
          <Delete
            onClick={this.removeModel}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            {cross()}
          </Delete>
        ) : null}
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
  border: 2px solid #2d2d2d;
  background: #2d2d2d;
  border-radius: 3px;
  margin-right: 6px;
  font-size: 10px;
  padding: 4px;
  padding-right: 15px;
  color: #969696;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const Delete = styled.svg`
  position: absolute;
  width: 21px;
  right: 8px;
  top: 2px;
  border-radius: 3px;
  &:hover {
    background: #212121;
  }
`;
