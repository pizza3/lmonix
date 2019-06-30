import React ,{Component} from 'react';
import styled from 'styled-components';

export default class Visible extends Component{
    state = {
        transparent:false
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
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
                <label className="form-switch">
                    <input type="checkbox" checked={this.state.transparent} onChange={this.handleInputChange} />
                    <i></i>
                </label>
            </Container>
        )
    }
}


const Container = styled.div`
    position:relative;
    float:left;
    width:100%;
    height:auto;
    padding-bottom: 18px;
`
const Title = styled.div`
    position: relative;
    float: left;
    color: #969696;
    font-size: 10px;
    margin-left: 9px;
    margin-top: 4px;
    font-weight: 700;
`