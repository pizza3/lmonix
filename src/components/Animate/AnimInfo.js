import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import AnimDropdown from './AnimDropdown'
export default class AnimInfo extends Component {
  // over here we have basic/common props needed for animation
  render() {
    const { animData } = this.props;
    return (
      <Container>
        {_.map(animData, (obj, i) => (
          <AnimDropdown name={obj.name} data={obj} key={i}/>
        ))}
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

