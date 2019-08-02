import React ,{Component} from 'react';
import _ from 'lodash'
import Switch from "../../../designLib/Switch";
import {Container, Title} from '../styled'

export default class Visible extends Component{
    state = {
        transparent:false
    }
    componentDidUpdate(prevProps){
        if(!_.isEqual(prevProps.active,this.props.active)){
            if(this.props.objPresent.length>0){
                let val = this.props.active.children[0].material.transparent || false
                this.setState({
                    transparent:val
                })
            }
        }   
    }
    handleInputChange=()=>{
        const {transparent} = this.state
        this.setState({
            transparent:!transparent
        },()=>{
            if(this.props.objPresent.length>0){
                this.props.changeObjectProp(!transparent,'transparent','material')
            }
        })
    }
    render(){
        return(
            <Container>
                <Title>Transparent</Title>
                <Switch checked={this.state.transparent} onChange={this.handleInputChange} />
            </Container>
        )
    }
}

