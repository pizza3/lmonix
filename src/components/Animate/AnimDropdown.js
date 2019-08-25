import React, { Component } from "react";
import styled from "styled-components";
import Select from "../../designLib/Select";
import Number from "../../designLib/Number";
import Switch from "../../designLib/Switch";
import _ from "lodash";
import From from "./From";
import {
  cross,
  swap,
  time,
  switchProp,
  ease,
  events
} from "../../assets/icon";
import { PropertyName, PropertyContainer } from "./styled";
import {
  genericProperties,
  genericPropertiesLights,
  directions,
  easeFuncsList,
  basicAnimationsConfig,
  animEvents
} from "../../helpers/helpers";
export default class AnimDropdown extends Component {
  // over here we have basic/common props needed for animation
  state = {
    index: 0,
    name: "",
    property: "rotation",
    delay: 0,
    duration: 1000,
    direction: "normal",
    easing: "linear",
    loop: true,
    loopvalue: 0,
    from: null,
    to: null,
    elasticity: 0,
    showConfig: true,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  };
  componentDidMount() {
    this.setComponentProp();
  }
  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (active.uuid !== prevProps.active.uuid) {
      this.setState(
        {
          index: 0
        },
        () => {
          this.setComponentProp();
        }
      );
    }
  }
  handleChange = e => {
    if (e.persist) e.persist();
    const { from, to, property, loop } = this.state;
    let propname = e.name || e.target.dataset.name || e.target.name;
    let value = e.value || e.target.value;

    propname = propname.toLowerCase();
    if (
      property === "rotation" ||
      property === "position" ||
      property === "scale"
    ) {
      let prop = propname[propname.length - 1];
      if (propname.includes("from")) {
        propname = "from";
        value = {
          ...from,
          [prop]: value
        };
      } else if (propname.includes("to")) {
        propname = "to";
        value = {
          ...to,
          [prop]: value
        };
      }
    } else if (
      property === "color" ||
      property === "opacity" ||
      property === "intensity"
    ) {
      if (propname.includes("from")) {
        propname = "from";
      } else if (propname.includes("to")) {
        propname = "to";
      }
    }
    if (propname === "loop") {
      value = !loop;
    }
    if (propname === "property") {
      this.setProprtyUpdate(value, this.state.name);
    }
    this.setState(
      {
        [propname]: value
      },
      () => {
        this.props.updateAnimate(this.state, this.state.index);
      }
    );
  };
  setProprtyUpdate = (property, name) => {
    const { active } = this.props;
    let from = basicAnimationsConfig[property].from,
      to = basicAnimationsConfig[property].to;
    if (property === "position" || property === "scale") {
      from = active[property];
      to = {
        ...active[property],
        y: active[property].y + 1
      };
    } else if (property === "color") {
      from = active.hashColor;
    } else if (property === "opacity") {
      from = active.children[0].material.opacity;
    }
    this.setState({
      ...basicAnimationsConfig[property],
      name,
      from,
      to
    });
  };
  setComponentProp = () => {
    const { index } = this.state;
    const { objAnimate } = this.props;
    this.setState({
      ...objAnimate[index]
    });
  };
  toggleConfig = () => {
    const { showConfig } = this.state;
    this.setState({
      showConfig: !showConfig
    });
  };
  handleChangeAnimIndex = e => {
    this.setState(
      {
        index: e.target.value
      },
      () => {
        this.setComponentProp();
      }
    );
  };
  handleDelete=()=>{
    const { index } = this.state;
    this.props.deleteAnimate(index)
    this.setState(
      {
        index: 0
      },
      () => {
        this.setComponentProp();
      }
    );
  }
  render() {
    const {
      index,
      property,
      delay,
      direction,
      easing,
      duration,
      loop,
      elasticity,
      showConfig,
      loopvalue,
      startevent,
      pauseevent,
      resumeevent
    } = this.state;
    const { name, active, objAnimate } = this.props;
    let fromData, toData, propoptions;
    if (active.objType === "Light") {
      propoptions = _.map(genericPropertiesLights, (prop, index) => {
        return (
          <optgroup key={index} label={index}>
            {_.map(prop, (val, i) => {
              return (
                <option key={i} value={val}>
                  {val}
                </option>
              );
            })}
          </optgroup>
        );
      });
    } else {
      propoptions = _.map(genericProperties, (prop, index) => {
        return (
          <optgroup key={index} label={index}>
            {_.map(prop, (val, i) => {
              return (
                <option key={i} value={val}>
                  {val}
                </option>
              );
            })}
          </optgroup>
        );
      });
    }
    const diroptions = _.map(directions, prop => {
      return (
        <option key={prop} value={prop}>
          {prop}
        </option>
      );
    });
    const easeOptions = _.map(easeFuncsList, prop => {
      return (
        <option key={prop} value={prop}>
          {prop}
        </option>
      );
    });
    const eventOptions = _.map(animEvents, prop => {
      return (
        <option key={prop} value={prop}>
          {prop}
        </option>
      );
    });
    const animOptions = _.map(objAnimate, (prop, index) => {
      return (
        <option key={index} value={index}>
          {objAnimate[index].name}
        </option>
      );
    });

    if (index !== 0 && _.isUndefined(objAnimate[index])) {
      fromData = objAnimate[0].from;
      toData = objAnimate[0].to;
    } else {
      fromData = objAnimate[index].from;
      toData = objAnimate[index].to;
    }
    return (
      <AnimContainer showConfig={showConfig}>
        <AnimText>
          <Select
            value={name}
            onChange={this.handleChangeAnimIndex}
            options={animOptions}
            name={"name"}
          />
        </AnimText>
        <AnimConfigIcon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={this.handleDelete}
        >
          {cross()}
        </AnimConfigIcon>
        <div>
          {showConfig ? (
            <AnimConfigDropdown>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {switchProp("#698bff")}
              </Icon>
              <IconTitle>Property</IconTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Type</PropertyName>
                  <Select
                    value={property}
                    onChange={this.handleChange}
                    options={propoptions}
                    name={"property"}
                  />
                </PropertyContainer>
                <From
                  name={"From"}
                  property={property}
                  data={fromData}
                  onChange={this.handleChange}
                />
                <From
                  name={"To"}
                  property={property}
                  data={toData}
                  onChange={this.handleChange}
                />
              </AnimConfigSeperator>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {time("#698bff")}
              </Icon>
              <IconTitle>Timing</IconTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Duration</PropertyName>
                  <EntitySymbol>(ms)</EntitySymbol>
                  <Number
                    value={duration}
                    onChange={this.handleChange}
                    name={"duration"}
                    Width={142}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Delay</PropertyName>
                  <EntitySymbol>(ms)</EntitySymbol>
                  <Number
                    value={delay}
                    onChange={this.handleChange}
                    Width={142}
                    name={"delay"}
                  />
                </PropertyContainer>
              </AnimConfigSeperator>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {swap("#698bff")}
              </Icon>
              <IconTitle>Order</IconTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Direction</PropertyName>
                  <Select
                    value={direction}
                    onChange={this.handleChange}
                    options={diroptions}
                    name={"direction"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Loop</PropertyName>
                  <Switch
                    checked={loop}
                    onChange={this.handleChange}
                    name={"loop"}
                  />
                </PropertyContainer>
                {!loop ? (
                  <PropertyContainer>
                    <PropertyName>Repeat</PropertyName>
                    <Number
                      value={loopvalue}
                      onChange={this.handleChange}
                      name={"loopvalue"}
                      Width={142}
                    />
                  </PropertyContainer>
                ) : (
                  []
                )}
              </AnimConfigSeperator>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 120">
                {ease("#698bff")}
              </Icon>
              <IconTitle>Easing</IconTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Easing</PropertyName>
                  <Select
                    value={easing}
                    onChange={this.handleChange}
                    options={easeOptions}
                    name={"easing"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Elasticity</PropertyName>
                  <Number
                    value={elasticity}
                    onChange={this.handleChange}
                    name={"elasticity"}
                    Width={142}
                  />
                </PropertyContainer>
              </AnimConfigSeperator>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {events("#698bff")}
              </Icon>
              <IconTitle>Trigger Events</IconTitle>
              <AnimConfigSeperator>
                <PropertyContainer>
                  <PropertyName>Start</PropertyName>
                  <Select
                    value={startevent}
                    onChange={this.handleChange}
                    options={eventOptions}
                    name={"startevent"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Pause</PropertyName>
                  <Select
                    value={pauseevent}
                    onChange={this.handleChange}
                    options={eventOptions}
                    name={"pauseevent"}
                  />
                </PropertyContainer>
                <PropertyContainer>
                  <PropertyName>Resume</PropertyName>
                  <Select
                    value={resumeevent}
                    onChange={this.handleChange}
                    options={eventOptions}
                    name={"resumeevent"}
                  />
                </PropertyContainer>
              </AnimConfigSeperator>
            </AnimConfigDropdown>
          ) : (
            []
          )}
        </div>
      </AnimContainer>
    );
  }
}

const AnimContainer = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  color: #707070;
  font-weight: 600;
  padding: 3px 7px 5px 1px;
  background: #1b1b1b;
  transition: 0.2s;
  overflow: hidden;
  border-bottom: 2px solid #2d2d2d;
`;
const AnimText = styled.div`
  position: relative;
  float: left;
  font-size: 12px;
  margin: 5px 1px 1px 6px;
`;
const EntitySymbol = styled.div`
  position: relative;
  font-size: 6px;
  float: left;
  margin-top: 4px;
  color: #707070;
`;

const AnimConfigIcon = styled.svg`
  position: absolute;
  width: 21px;
  right: 8px;
  top: 9px;
  border-radius: 3px;
  background: #212121;
  &:hover {
    background: #fd6e6e;
  }
`;

const AnimConfigDropdown = styled.div`
  width: 103%;
  position: relative;
  height: 100%;
  top: 5px;
  background: #151515;
  z-index: 100;
  padding: 14px 7px 0px 7px;
  overflow: auto;
  border-top: 2px solid #2d2d2d;
`;

const AnimConfigTitle = styled.div`
  color: #707070;
  font-weight: 800;
  font-size: 26px;
`;

const AnimConfigSeperator = styled.div`
  position: relative;
  float: left;
  border-radius: 3px;
  padding-left: 5px;
  padding-bottom: 7px;
  width: 100%;
  /* background: #1f1f1f; */
  margin-bottom: 21px;
`;

const Icon = styled.svg`
  position: relative;
  width: 24px;
  float: left;
`;

const IconTitle = styled.div`
  position: relative;
  float: left;
  font-size: 13px;
  font-weight: 900;
  top: 4px;
  color: #ececec;
  left: 5px;
`;
