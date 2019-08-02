import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import Switch from "../../../designLib/Switch";
import { Container, Title } from "../styled";

export default class CastShadow extends Component {
  state = {
    castShadow: false
  };

  componentDidUpdate(prevProps) {
    const { isModel } = this.props;
    if (!_.isEqual(prevProps.active, this.props.active)) {
      if (this.props.objPresent.length > 0) {
        let val;
        if (isModel) {
          val = this.props.active.castShadow || false;
        } else {
          val = this.props.active.children[0].castShadow || false;
        }
        this.setState({
          castShadow: val
        });
      }
    }
  }

  handleInputChange = () => {
    const { castShadow } = this.state;
    const { isModel } = this.props;
    this.setState(
      {
        castShadow: !castShadow
      },
      () => {
        if (this.props.objPresent.length > 0) {
          if (isModel) {
            this.props.changeObjectProp(!castShadow, "castShadow");
          } else {
            this.props.changeObjectProp(!castShadow, "castShadow", "children");
          }
        }
      }
    );
  };
  render() {
    return (
      <Container>
        <Title>Cast Shadow</Title>
        <Switch
          checked={this.state.castShadow}
          onChange={this.handleInputChange}
        />
      </Container>
    );
  }
}
