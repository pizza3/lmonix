import React ,{Component} from 'react';
import styled from 'styled-components';

export default class ReceiveShadow extends Component{
    state = {
        receiveShadow:false
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
            if(this.props.objPresent.length>0){
                let val = this.props.objPresent[this.props.activeObj].receiveShadow || false
                this.setState({
                    receiveShadow:val
                })
            }
        }
    }

    handleInputChange=()=>{
        const {receiveShadow} = this.state
        this.setState({
            receiveShadow:!receiveShadow
        },()=>{
            if(this.props.objPresent.length>0){
                this.props.objPresent[this.props.activeObj].receiveShadow = !receiveShadow
            }
        })
    }
    render(){
        return(
            <Container>
                <Title>Receive Shadow</Title>
                <label class="form-switch">
                    <input type="checkbox" checked={this.state.receiveShadow} onChange={this.handleInputChange} />
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
    font-size: 12px;
    margin-left: 9px;
    margin-top: 4px;
`