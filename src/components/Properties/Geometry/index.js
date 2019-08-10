import React, { Component } from "react";
import _ from "lodash";
import { updateGeometry } from "../../Helpers/helpers";
import { Container, Title } from "../styled";
import Select from "../../../designLib/Select";
const primitiveMap = {
  BoxBufferGeometry: "Box",
  SphereBufferGeometry: "Sphere",
  PlaneBufferGeometry: "Plane",
  CylinderBufferGeometry: "Cylinder",
  ConeBufferGeometry: "Cone",
  RingBufferGeometry: "Ring",
  CircleBufferGeometry: "Circle"
};

export default class Geometry extends Component {
  state = {
    value: "BoxBufferGeometry"
  };

  componentDidMount() {
    const { active } = this.props;
    this.setState({
      value: active.children[0].geometry.type
    });
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (!_.isEqual(active, prevProps.active)) {
      this.setState({
        value: active.children[0].geometry.type
      });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    const Geometry = this.checkGeometry(event.target.value);
    const type = primitiveMap[event.target.value];
    this.props.replaceGeometry(Geometry, type);
  };

  checkGeometry = type => {
    return updateGeometry(type, {}, {});
  };
  render() {
    const options = _.map(primitiveMap, (val, key) => {
      return (
        <option key={key} value={key}>
          {val}
        </option>
      );
    });
    return (
      <Container
        style={{
          borderBottom: "2px solid #2d2d2d",
          marginBottom: "20px"
        }}
      >
        <Title>Geometry</Title>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          options={options}
        />
      </Container>
    );
  }
}
