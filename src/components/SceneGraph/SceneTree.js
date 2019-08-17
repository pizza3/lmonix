import React, { Component } from "react";
import styled from "styled-components";
import {
  sky,
  point,
  hemisphere,
  arrow,
  sphere,
  cone,
  boxLogo,
  cylinder,
  circle,
  ring,
  plane,
  spot,
  directional,
  curvedImage,
  model
} from "../../assets/icon";
import _ from "lodash";

const elementFuncs = {
  sphere: sphere,
  cone: cone,
  box: boxLogo,
  cylinder: cylinder,
  circle: circle,
  ring: ring,
  plane: plane,
  spot: spot,
  ambient: spot,
  directional: directional,
  hemisphere: hemisphere,
  point: point,
  sky: sky,
  curvedimage: curvedImage,
  '3DModel': model
};

const applyIcon = (entity, iconColor) => {
  let viewBox="0 0 125 125"
  if (entity === "sky" || entity === "3DModel") {
    viewBox="0 0 512 512"
  } else if (entity === "directional") {
    viewBox="0 0 91 113.75"
  } else if (entity === "text") {
    return <TextLogo style={{ color: iconColor }}>T</TextLogo>;
  } else if (entity === "curvedimage") {
    viewBox="0 0 16 20"
  }
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      {elementFuncs[entity](iconColor)}
    </Svg>
  );
};

export default class SceneTree extends Component {
  state = {
    isGroup: false,
    showGroup: false,
    showInputBox: true,
    nameValue: "",
    mouseOver: false
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
  doClickAction = () => {};
  doDoubleClickAction = () => {
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

  handleMouseDown = (event) => {
    event.preventDefault();
    console.log('got clicked');
    
    const { setDragObj, obj, active, setActiveObj } = this.props;
    const isActive = obj.uuid === active.uuid;
    setActiveObj(obj);
    setDragObj(obj, isActive);
  };

  handleMouseEnter = () => {
    const { isDrag, setParent, obj } = this.props;
    if (isDrag) {
      this.setState(
        {
          mouseOver: true
        },
        () => {
          setParent(obj);
        }
      );
    }
  };

  handleMouseLeave = () => {
    console.log('leaves');
    
    this.setState({
      mouseOver: false
    });
  };

  render() {
    const { layer, obj, children, active, isDrag } = this.props;
    const isActive = obj.uuid === active.uuid;
    const { showInputBox, nameValue, mouseOver } = this.state;
    const iconColor = isActive ? "#ffffff" : "#828282";
    const SceneGraphEl = styled.div`
      position: relative;
      width: 100%;
      height: 22px;
      background: ${isActive ? "#2F79EF" : "transparent"};
      border-radius: 0px;
      left: 0%;
      color: ${isActive ? "#FFFFFF" : "#828282"};
      font-size: 10px;
      padding: ${props => `4px 2px 0px ${5 + 3 * layer}px`};
      border-bottom: 2px solid
        ${mouseOver && isDrag && !isActive ? "#9bc2ff" : "transparent"};
      &:hover {
        background: ${isActive ? "#186AEB" : "#E6E6E6"};
      }`;

    // const style={
    //   position: "relative",
    //   width: "100%",
    //   height: "22px",
    //   background: isActive ? "#2F79EF" : "transparent",
    //   borderRadius: "0px",
    //   left: "0%",
    //   color: isActive ? "#FFFFFF" : "#828282",
    //   fontSize: "10px",
    //   padding: `4px 2px 0px ${5 + 3 * layer}px`,
    //   borderBottom: `2px solid ${mouseOver && isDrag ? "#9bc2ff" : "transparent"}`,
    // }
    return (
      <Container id={"obj" + obj.uuid}>
        <SceneGraphEl
          // isActive={isActive}
          layer={layer}
          // style={style}
          // ismouseOver={mouseOver && isDrag}
          onClick={this.handleMouseDown}
          // onMouseOver={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
        >
          {applyIcon(obj.objPrimitive, iconColor)}
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
              <Text style={{ color: isActive ? "#ffffff" : "#707070" }}>
                {nameValue}
              </Text>
            )}
          </form>
          {obj.children.length > 1 ? (
            <ArrowContainer onClick={this.showGroup}>
              <ArrowImage
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3.653 6.39"
                showGroup={this.state.showGroup}
              >
                {arrow(isActive ? "#ffffff" : "#828282")}
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

// const SceneGraphEl = styled.div`
// position: relative;
// width: 100%;
// height: 22px;
// background: ${props => (props.isActive ? "#2F79EF" : "transparent")};
// border-radius: 0px;
// left: 0%;
// color: ${props => (props.isActive ? "#FFFFFF" : "#828282")};
// font-size: 10px;
// padding: ${props => `4px 2px 0px ${5 + 3 * props.layer}px`};
// border-bottom: 2px solid
//   ${props => (props.ismouseOver ? "#9bc2ff" : "transparent")};
// &:hover {
//   background: ${props => (props.isActive ? "#186AEB" : "#E6E6E6")};
// }`;

const ArrowImage = styled.svg`
  width: 5px;
  transform: ${props => (props.showGroup ? "rotate(90deg)" : "rotate(0deg)")};
`;

const EditInput = styled.input`
  border: none;
  background: none;
  color: #fff;
  border-radius: 2px;
  user-select: none;
`;

const Text = styled.div`
  color: #fff;
`;

const TextLogo = styled.div`
  float: left;
  font-family: monospace;
  font-weight: 700;
  font-size: 12px;
  margin-right: 3px;
  width: 13px;
  text-align: center;
`;

const Svg = styled.svg`
  position: relative;
  float: left;
  width: 13px;
  margin-right: 3px;
  margin-top: 1px;
`;
