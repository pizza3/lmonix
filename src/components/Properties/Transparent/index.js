import React, { Component } from "react";
import _ from "lodash";
import Switch from "../../../designLib/Switch";
import { Container, Title } from "../styled";

export default class Transparent extends Component {
  state = {
    transparent: false
  };
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.active.uuid, this.props.active.uuid)) {
      let val = this.props.active.children[0].material.transparent || false;
      this.setState({
        transparent: this.props.active.children[0].material.transparent
      });
    }
  }
  handleInputChange = () => {
    const { transparent } = this.state;
    this.setState(
      {
        transparent: !transparent
      },
      () => {
        this.props.changeObjectProp(!transparent, "transparent", "material");
      }
    );
  };
  render() {
    return (
      <Container>
        <Title>Transparent</Title>
        <Switch
          checked={this.state.transparent}
          onChange={this.handleInputChange}
        />
      </Container>
    );
  }
}
