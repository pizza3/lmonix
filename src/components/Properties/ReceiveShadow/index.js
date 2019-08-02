import React ,{Component} from 'react';
import _ from 'lodash'
import {Container, Title} from '../styled'
import Switch from "../../../designLib/Switch";

export default class ReceiveShadow extends Component{
    state = {
        receiveShadow:false
    }
    componentDidUpdate(prevProps){
        if(!_.isEqual(prevProps.active,this.props.active)){
        const {isModel}=this.props
            if(this.props.objPresent.length>0){
                let val;
                if(isModel){
                    val = this.props.active.receiveShadow || false
                }
                else{
                    val = this.props.active.children[0].receiveShadow || false
                }
                this.setState({
                    receiveShadow:val
                })
            }
        }
    }
    handleInputChange=()=>{
        const {receiveShadow} = this.state
        const {isModel}=this.props
        this.setState({
            receiveShadow:!receiveShadow
        },()=>{
            if(this.props.objPresent.length>0){
                if(isModel){
                    this.props.changeObjectProp(!receiveShadow,'receiveShadow')
                }
                else{
                    this.props.changeObjectProp(!receiveShadow,'receiveShadow','children')
                }
            }
        })
    }
    render(){
        return(
            <Container>
                <Title>Receive Shadow</Title>
                  <Switch checked={this.state.receiveShadow} onChange={this.handleInputChange} />
            </Container>
        )
    }
}
