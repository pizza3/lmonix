import React, { Component } from "react";
import styled from "styled-components";
// import _ from "lodash";
import AnimDropdown from "./AnimDropdown";
export default class AnimInfo extends Component {
  // over here we have basic/common props needed for animation
  render() {
    const { name, data, index, updateAnimate, active, objAnimate, deleteAnimate } = this.props;
    return (
      <Container>
        <AnimDropdown
          name={name}
          data={data}
          index={index}
          updateAnimate={updateAnimate}
          deleteAnimate={deleteAnimate}
          active={active}
          objAnimate={objAnimate}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  float: left;
`;