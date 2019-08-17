import React, { Component } from "react";
import _ from 'lodash'
import { updateGeometry, updateLights} from '../../../helpers/helpers'
import {Container, Title} from '../styled'
import Select from "../../../designLib/Select";

const primitiveMap = {
    AmbientLight: "Ambient",
    DirectionalLight: "Directional",
    HemisphereLight: "Hemisphere",
    SpotLight: "Spot",
    PointLight:"Point"
};

export default class Lights extends Component {
  state = {
    value: "AmbientLight"
  };

  componentDidMount(){
    const {active}=this.props
    this.setState({
      value: active.children[0].type
  })
  }

  componentDidUpdate(prevProps){
    const {active}=this.props
    if(!_.isEqual(active.uuid,prevProps.active.uuid)){      
        this.setState({
            value: active.children[0].type
        })
    }
  }

  handleChange = event => {
    const {active}=this.props
    this.setState({ value: event.target.value });
    const type = primitiveMap[event.target.value];
    const Lights = updateLights(event.target.value, active.children[0])
    this.props.replaceLights(Lights,type);
  };

  checkGeometry = type => {
      return updateGeometry(type,{},{})
  };
  render() {
    const options = _.map(primitiveMap,(val,key)=>{
        return (
            <option key={key} value={key}>{val}</option>
        )
    })
    return (
      <Container style={{
        borderBottom: '2px solid #2d2d2d',
        marginBottom: '20px'
      }}>
        <Title>Lighting</Title>
        <Select value={this.state.value} onChange={this.handleChange} options={options}/>
      </Container>
    );
  }
}
