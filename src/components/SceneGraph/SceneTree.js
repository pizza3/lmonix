import React, { Component } from "react";
import styled from "styled-components";
// import arrowWhite from "../../assets/arrowWhite.svg";
// import arrow from "../../assets/arrow.svg";

import {arrow} from '../../assets/icon'
import _ from "lodash";
export default class SceneTree extends Component {
  state = {
    isGroup: false,
    showGroup: false,
    showInputBox: false,
    nameValue: ""
  };
  componentDidMount() {
    this.timer = 0;
    this.delay = 200;
    this.prevent = false;
    const { activeDrilldown, obj, name } = this.props;
    if (_.isUndefined(activeDrilldown[obj.uuid])) {
      this.setState({
        showGroup: false
      });
    } else {
      this.setState({
        showGroup: activeDrilldown[obj.uuid]
      });
    }
    this.setState({
      nameValue: name
    });
  }
  showGroup = () => {
    const { showGroup } = this.state;
    const { updateActiveDrilldown, obj } = this.props;
    this.setState(
      {
        showGroup: !showGroup
      },
      () => {
        updateActiveDrilldown(obj.uuid, !showGroup);
      }
    );
  };
  doClickAction = () => {
    console.log(" click");
  };
  doDoubleClickAction = () => {
    console.log("Double Click");
    this.setState({
      showInputBox: true
    });
  };
  handleClick = () => {
    this.timer = setTimeout(
      function() {
        if (!this.prevent) {
          this.doClickAction();
        }
        this.prevent = false;
      }.bind(this),
      this.delay
    );
  };
  handleDoubleClick = () => {
    clearTimeout(this.timer);
    this.prevent = true;
    this.doDoubleClickAction();
  };
  handlenameChange = e => {
    this.setState({
      nameValue: e.target.value
    });
  };
  setFocusOut = e => {
    this.setState({
      showInputBox: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { nameValue } = this.state;
    this.props.changeObjectProp(nameValue, "name");
    this.setFocusOut();
  };

  render() {
    const { layer, obj, children, active, setActiveObj } = this.props;
    const isActive = obj.uuid === active.uuid;
    const { showInputBox, nameValue } = this.state;
    return (
      <Container>
        <SceneGraphEl
          id={"obj" + obj.uuid}
          isActive={isActive}
          layer={layer}
          onClick={() => {
            setActiveObj(obj);
          }}
        >
          <form
            id="form"
            onDoubleClick={this.handleDoubleClick.bind(this)}
            onSubmit={this.handleSubmit}
          >
            {showInputBox ? (
              <EditInput
                type="text"
                value={nameValue}
                onChange={this.handlenameChange}
                style={{
                  background: "#4c94ff"
                }}
                onBlur={this.setFocusOut}
                autoFocus
              />
            ) : (
              <EditInput
                type="text"
                value={nameValue}
                disabled
                style={{ color: isActive ? "#ffffff" : "#707070" }}
              />
            )}
          </form>
          {obj.children.length > 1 ? (
            <ArrowContainer onClick={this.showGroup}>
              <ArrowImage
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.653 6.39"
                showGroup={this.state.showGroup}
              >
                {arrow(isActive?"#ffffff":"#828282")}
              </ArrowImage>
            </ArrowContainer>
          ) : null}
        </SceneGraphEl>
        {this.state.showGroup ? children : []}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 100%;
  float: left;
  height: auto;
`;

const ArrowContainer = styled.button`
    position: absolute;
    width: 13px;
    right: 2px;
    top: 4px;
    height: 15px;
    border: none;
    background: transparent;
`;

const ArrowImage = styled.svg`
  width: 5px;
  transform: ${props => (props.showGroup ? "rotate(90deg)" : "rotate(0deg)")};
`;

const SceneGraphEl = styled.div`
  position: relative;
  width: 100%;
  height: 22px;
  background: ${props => (props.isActive ? "#2F79EF" : "transparent")};
  border-radius: 0px;
  left: 0%;
  color: ${props => (props.isActive ? "#FFFFFF" : "#828282")};
  font-size: 10px;
  padding: ${props => `4px 2px 0px ${5 + 3 * props.layer}px`};
  &:hover {
    background: ${props => (props.isActive ? "#186AEB" : "#E6E6E6")};
  }
`;

const EditInput = styled.input`
  border: none;
  background: none;
  color: #fff;
  border-radius: 2px;
`;
