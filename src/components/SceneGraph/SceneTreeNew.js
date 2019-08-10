
import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
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
  "3DModel": model
};

const applyIcon = (entity, iconColor) => {
  let viewBox = "0 0 125 125";
  if (entity === "sky" || entity === "3DModel") {
    viewBox = "0 0 512 512";
  } else if (entity === "directional") {
    viewBox = "0 0 91 113.75";
  } else if (entity === "text") {
    return <TextLogo style={{ color: iconColor }}>T</TextLogo>;
  } else if (entity === "curvedimage") {
    viewBox = "0 0 16 20";
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
    showInputBox: false,
    nameValue: "",
    mouseOver: false
  };
  componentDidMount() {
    const { activeDrilldown, name } = this.props;
    if (_.isUndefined(activeDrilldown[this.props.obj.uuid])) {
      this.setState({
        showGroup: false
      });
    } else {
      this.setState({
        showGroup: activeDrilldown[this.props.obj.uuid]
      });
    }
    this.setState({
      nameValue: name
    });
  }

  showGroup = () => {
    const { showGroup } = this.state;
    this.setState(
      {
        showGroup: !showGroup
      },
      () => {
        this.props.updateActiveDrilldown(this.props.obj.uuid, !showGroup);
      }
    );
  };

  doDoubleClickAction = () => {    
    this.setState({
      showInputBox: true
    });
  };

  // form handlers
  handlenameChange = e => {
    this.setState({
      nameValue: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { nameValue } = this.state;
    this.props.changeObjectProp(nameValue, "name");
    this.setFocusOut();
  };
  setFocusOut = e => {
    this.setState({
      showInputBox: false
    });
  };
  handleMouseDown = (event) => {
    event.preventDefault();    
    const { setDragObj, obj, active } = this.props;
    setDragObj(obj);
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
    this.setState({
      mouseOver: false
    });
  };

  // scene graph renderig control
  returnSceneGraph = (children)=>{
    const { layer, active, obj, isDrag } = this.props;
    const { mouseOver } = this.state
    const isActive = obj.uuid === active.uuid;
    const SceneGraphEl = styled.div`
      position: relative;
      width: 100%;
      height: 22px;
      background: ${isActive ? "#4f74f9" : "transparent"};
      border-radius: 0px;
      left: 0%;
      color: ${isActive ? "#FFFFFF" : "#828282"};
      font-size: 10px;
      padding: 4px 2px 0px ${5 + 3 * layer}px;
      border-bottom: 2px solid
        ${mouseOver && isDrag && !isActive ? "#9bc2ff" : "transparent"};
      &:hover {
        background: ${isActive ? "#4f74f9" : "#2d2d2d"};
      }
    `;
    if(isActive){
        return (
        <SceneGraphEl
            id={"obj" + this.props.obj.uuid}
        >
            {children}
        </SceneGraphEl>)
    }
    return (
        <SceneGraphEl
            id={"obj" + this.props.obj.uuid}
            onClick={() => {
                this.props.setActiveObj(this.props.obj);
            }}
        >
          {children}
        </SceneGraphEl>
    )
  
  }
  render() {
    const { active, obj } = this.props;
    const { showInputBox, nameValue } = this.state;
    const isActive = obj.uuid === active.uuid;
    const iconColor = isActive ? "#ffffff" : "#828282";
    const children = <>
    {applyIcon(obj.objPrimitive, iconColor)}
          <Form
            id="form"
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
              <Text 
                onDoubleClick={this.doDoubleClickAction}              
                style={{ color: isActive ? "#ffffff" : "#707070" }}>
                {nameValue}
              </Text>
            )}
          </Form>
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
    </>
    return (
      <Container>
        {this.returnSceneGraph(children)}
        {this.state.showGroup ? this.props.children : []}
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
  position: relative;
  float: right;
  width: 13px;
  height: 15px;
  border: none;
  background: transparent;
`;

const ArrowImage = styled.svg`
  width: 5px;
  transform: ${props => (props.showGroup ? "rotate(90deg)" : "rotate(0deg)")};
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


const Form = styled.form`
    width: 155px;
    position: relative;
    float: left;
`