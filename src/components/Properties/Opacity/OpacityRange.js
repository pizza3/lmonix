import React, { Component } from "react";
import _ from "lodash";
import Range from "../../../designLib/Range";

export default class OpacityRange extends Component {
  state = {
    value: 0.0
  };
  componentDidMount() {
    this.setState({
      value: this.props.active.children[0].material.opacity
    });
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.active, this.props.active)) {
      this.setState({
        value: this.props.active.children[0].material.opacity
      });
    }
  }
  handleRange = e => {
    this.setState({
      value: e.target.value
    });
    this.props.changeObjectProp(
      parseFloat(e.target.value),
      "opacity",
      "material"
    );
  };

  render() {
    return (
      <Range
        min={0.0}
        max={1.0}
        step={0.1}
        value={this.state.value}
        onChange={this.handleRange}
      />
    );
  }
}
