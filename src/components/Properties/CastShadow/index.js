import React ,{Component} from 'react';
import styled from 'styled-components';

export default class CastShadow extends Component{
    state = {
        castShadow:false
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
            if(this.props.objPresent.length>0){
                let val = this.props.objPresent[this.props.activeObj].castShadow || false
                this.setState({
                    castShadow:val
                })
            }
        }
    }

    handleInputChange=()=>{
        const {castShadow} = this.state
        this.setState({
            castShadow:!castShadow
        },()=>{
            if(this.props.objPresent.length>0){
                this.props.objPresent[this.props.activeObj].castShadow = !castShadow
            }
        })
    }
    render(){
        return(
            <Container>
                <Title>Cast Shadow</Title>
                <label class="form-switch">
                    <input type="checkbox" checked={this.state.castShadow} onChange={this.handleInputChange} />
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