import React ,{Component} from 'react';
import styled from 'styled-components';

export default class ReceiveShadow extends Component{
    state = {
        receiveShadow:false
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
        const {isModel}=this.props
            if(this.props.objPresent.length>0){
                let val;
                if(isModel){
                    val = this.props.objPresent[this.props.activeObj].receiveShadow || false
                }
                else{
                    val = this.props.objPresent[this.props.activeObj].children[0].receiveShadow || false
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
                <label className="form-switch">
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
    font-size: 10px;
    margin-left: 9px;
    margin-top: 4px;
    font-weight: 700;
`