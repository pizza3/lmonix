import React, { Component } from "react";
import { Container, Title } from "../styled";
import Number from "../../../designLib/Number";
import Range from "../../../designLib/Range";

export default class Distance extends Component {
  state = {
    distance: 100,
    angle:1.05
  };
  componentDidMount() {
      const {distance, angle} =this.props
    this.setState({
        distance,
        angle
    });
  }
  handleChange = e => {
    e.persist()
    const name = e.target.dataset.name
    console.log(name, e.target.value);
    this.setState({
      [name]: e.target.value
    });
    this.props.active.children[0][name] = parseFloat(e.target.value);
  };
  render() {
    const { distance, angle } = this.state;
    return (
      <>
        <Container>
          <Title>Distance</Title>
          <Number
            value={distance}
            onChange={this.handleChange}
            name="distance"
          />
        </Container>
        <Container>
          <Title>Angle</Title>
          <Range
            value={angle}
            onChange={this.handleChange}
            name="angle"
            min={0}
            max={6.28319}
            step={0.01}
          />
        </Container>
      </>
    );
  }
}
