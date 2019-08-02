import React, { Component } from "react";
import styled from "styled-components";
import { geometryExist, toCamelCase } from "../../Helpers/helpers";
import Switch from "../../../designLib/Switch";
import Range from "../../../designLib/Range";
import { Container, Title } from "../styled";
export default class CustomGeometry extends Component {
  state = {
    value: 0,
    valueBool: false,
    valueRange: 0
  };

  componentDidMount() {
    this.setValue();
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (
      prevProps.active &&
      prevProps.active.objPrimitive !== active.objPrimitive
    ) {
      this.setValue();
    } else if (prevProps.active.uuid !== active.uuid) {
      this.setValue();
    }
  }

  setValue = () => {
    const { active, title, type } = this.props;
    const geometryProps = active.children[0].geometry.parameters;
    if (type === "boolean") {
      this.setState({
        valueBool: geometryProps[toCamelCase(title)]
      });
    } else if (type === "range") {
      this.setState({
        valueRange: geometryProps[toCamelCase(title)]
      });
    } else {
      this.setState({
        value: Number(geometryProps[toCamelCase(title)])
      });
    }
  };

  updateValue = e => {
    const { updateGeometry, title, type } = this.props;
    if (type === "boolean") {
      this.setState(
        {
          valueBool: e.target.value
        },
        () => {
          updateGeometry(this.state.valueBool, title);
        }
      );
    } else if (type === "range") {
      this.setState(
        {
          valueRange: e.target.value
        },
        () => {
          updateGeometry(this.state.valueRange, title);
        }
      );
    } else {
      this.setState(
        {
          value: Number(e.target.value)
        },
        () => {
          updateGeometry(this.state.value, title);
        }
      );
    }
  };

  getComponent = () => {
    const { type, config } = this.props;
    const { value, valueBool, valueRange } = this.state;
    if (type === "boolean") {
      return <Switch checked={valueBool} onChange={this.updateValue} />;
    } else if (type === "range") {
      return (
        <Range
          min={config.min}
          max={config.max}
          step={config.step}
          value={valueRange}
          onChange={this.updateValue}
        />
      );
    } else {
      return <Input type="number" value={value} onChange={this.updateValue} />;
    }
  };

  render() {
    const { title, active } = this.props;
    const geometryProps = active && active.children[0].geometry.parameters;
    // const visible = geometryExist(geometryProps, title);
    const component = this.getComponent();
    return (
      <Container>
        <Title>{title}</Title>
        {component}
      </Container>
    );
  }
}

const Input = styled.input`
  width: 36px;
  height: 25px;
  border: 2px solid #dbdbdb;
  background: #dbdbdb;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 600;
  color: #737373;
  float: right;
  margin-right: 6px;
  &:focus {
    outline: none;
    background: #2f79ef;
    color: #fff;
    border: 2px solid #2f79ef;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
