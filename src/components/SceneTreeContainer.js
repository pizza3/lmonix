import React, {Component} from 'react';
import styled from 'styled-components';
import SceneTree from './SceneGraph/SceneTree'

export default class SceneTreeContainer extends Component{

    render(){
        return(
            <Container>
                 <SceneTree num={this.props.num} name={this.props.name} active={this.props.active} {...this.props} objPresent={this.props.objPresent} />
            </Container>
        )
    }
}

const Container = styled.div`
    position:relative;
    width:100%;
    float:left;
    height:auto;
    `