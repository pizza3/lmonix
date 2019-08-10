import React, { Component, Fragment } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Container, Title } from "../styled";

export default class Transform extends Component {
  state = {
    traX: 0,
    traY: 0,
    traZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    scaX: 0,
    scaY: 0,
    scaZ: 0
  };
  componentDidMount() {
    this.props.setController(this.setPos);
  }

  setPos = (val, mode) => {
    if (mode === "translate") {
      this.setState({
        traX: val.x,
        traY: val.y,
        traZ: val.z
      });
    } else if (mode === "rotate") {
      this.setState({
        rotX: val.x,
        rotY: val.y,
        rotZ: val.z
      });
    } else {
      this.setState({
        scaX: val.x,
        scaY: val.y,
        scaZ: val.z
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.active, this.props.active)) {
      const tx = this.props.active.position.x;
      const ty = this.props.active.position.y;
      const tz = this.props.active.position.z;
      const rx = this.props.active.rotation.x;
      const ry = this.props.active.rotation.y;
      const rz = this.props.active.rotation.z;
      const sx = this.props.active.scale.x;
      const sy = this.props.active.scale.y;
      const sz = this.props.active.scale.z;
      this.setState({
        traX: tx,
        traY: ty,
        traZ: tz,
        rotX: rx,
        rotY: ry,
        rotZ: rz,
        scaX: sx,
        scaY: sy,
        scaZ: sz
      });
    }
  }
  handleChange = e => {
    const name = e.target.name;
    const prop = e.target.prop;
    console.log(prop);

    switch (e.target.name) {
      case "traX":
        this.setState(
          {
            [name]: Number(e.target.value)
          },
          () => {
            this.props.changeObjectProp(
              this.state[name],
              ["position", "x"],
              "transform"
            );
          }
        );
        break;
      case "traY":
        this.setState(
          {
            traY: Number(e.target.value)
          },
          () => {
            this.props.changeObjectProp(
              this.state.traY,
              ["position", "y"],
              "transform"
            );
          }
        );
        break;
      case "traZ":
        this.setState(
          {
            traZ: Number(e.target.value)
          },
          () => {
            this.props.changeObjectProp(
              this.state.traZ,
              ["position", "z"],
              "transform"
            );
          }
        );
        break;
      case "rotX":
        this.setState(
          {
            rotX: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.rotX,
              ["rotation", "x"],
              "transform"
            );
          }
        );
        break;
      case "rotY":
        this.setState(
          {
            rotY: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.rotY,
              ["rotation", "y"],
              "transform"
            );
          }
        );
        break;
      case "rotZ":
        this.setState(
          {
            rotZ: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.rotZ,
              ["rotation", "z"],
              "transform"
            );
          }
        );
        break;
      case "scaX":
        this.setState(
          {
            scaX: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.scaX,
              ["scale", "x"],
              "transform"
            );
          }
        );
        break;
      case "scaY":
        this.setState(
          {
            scaY: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.scaY,
              ["scale", "y"],
              "transform"
            );
          }
        );
        break;
      case "scaZ":
        this.setState(
          {
            scaZ: e.target.value
          },
          () => {
            this.props.changeObjectProp(
              this.state.scaZ,
              ["scale", "z"],
              "transform"
            );
          }
        );
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <Fragment>
        <Overlay>
          <Container>
            <Title>Translate</Title>
            <Prop>
              Z:
              <Input
                prop="z"
                name="traZ"
                type="number"
                value={this.state.traZ}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              Y:
              <Input
                prop="y"
                name="traY"
                type="number"
                value={this.state.traY}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              X:
              <Input
                prop={{ x: "x" }}
                name="traX"
                type="number"
                value={this.state.traX}
                onChange={this.handleChange}
              />
            </Prop>
          </Container>
          <Container>
            <Title>Rotation</Title>
            <Prop>
              Z:
              <Input
                prop="z"
                name="rotZ"
                type="number"
                value={this.state.rotZ}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              Y:
              <Input
                prop="y"
                name="rotY"
                type="number"
                value={this.state.rotY}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              X:
              <Input
                prop="x"
                name="rotX"
                type="number"
                value={this.state.rotX}
                onChange={this.handleChange}
              />
            </Prop>
          </Container>
          <Container>
            <Title>Scale</Title>
            <Prop>
              Z:
              <Input
                prop="z"
                name="scaZ"
                type="number"
                value={this.state.scaZ}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              Y:
              <Input
                prop="y"
                name="scaY"
                type="number"
                value={this.state.scaY}
                onChange={this.handleChange}
              />
            </Prop>
            <Prop>
              X:
              <Input
                prop="x"
                name="scaX"
                type="number"
                value={this.state.scaX}
                onChange={this.handleChange}
              />
            </Prop>
          </Container>
        </Overlay>
      </Fragment>
    );
  }
}
const Prop = styled.div`
  float: right;
  font-size: 11px;
  color: #9d9d9d;
  margin-right: 9px;
`;
const Input = styled.input`
  width: 36px;
  height: 25px;
  border: 2px solid #2d2d2d;
  background: #2d2d2d;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 600;
  color: #737373;
  &:focus {
    outline: none;
    background: #4f74f9;
    color: #fff;
    border: 2px solid #4f74f9;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Overlay = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
