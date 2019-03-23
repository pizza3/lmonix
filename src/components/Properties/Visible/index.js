import React ,{Component} from 'react';
import styled from 'styled-components';

export default class Visible extends Component{
    state = {
        visible:false
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
            if(this.props.objPresent.length>0){
                let val = this.props.objPresent[this.props.activeObj].visible || false
                this.setState({
                    visible:val
                })
            }
        }
        
    }

    handleInputChange=()=>{
        const {visible} = this.state
        this.setState({
            visible:!visible
        },()=>{
            if(this.props.objPresent.length>0){
                this.props.objPresent[this.props.activeObj].visible = !visible
            }
        })
    }
    render(){
        return(
            <Container>
                <Title>Visible</Title>
                <label class="form-switch">
                    <input type="checkbox" checked={this.state.visible} onChange={this.handleInputChange} />
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