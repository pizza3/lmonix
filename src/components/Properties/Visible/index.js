import React, { Component } from "react";
import _ from "lodash";
import Switch from "../../../designLib/Switch";
import {Container, Title} from '../styled'
export default class Visible extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    if (this.props.active) {
      this.setState({
        visible: this.props.active.visible
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.active, this.props.active)) {
        this.setState({
          visible: this.props.active.visible
        });
    }
  }

  handleInputChange = () => {
    const { visible } = this.state;
    this.setState(
      {
        visible: !visible
      },
      () => {
        this.props.changeObjectProp(!this.props.active.visible, "visible");
      }
    );
  };
  render() {
    const { visible } = this.state;
    return (
      <Container>
        <Title>Visible</Title>
          <Switch checked={visible} onChange={this.handleInputChange} />
      </Container>
    );
  }
}