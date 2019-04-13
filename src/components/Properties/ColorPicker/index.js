import React ,{Component} from 'react';
import styled from 'styled-components';
import Trigger from 'rc-trigger'
import ColorPickerDropdown from './ColorPickerDropdown'

export default class ColorPicker extends Component{
    state = {
        currentColor:'#fff'
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
                this.onChange(this.props.objPresent[this.props.activeObj].hashColor)
        }
    }
    onChange=(currentColor)=>{
        this.setState({
            currentColor
        })
        let hex = parseInt(currentColor.replace(/^#/, ""), 16);
        if(this.props.objPresent[this.props.activeObj].objType==='Mesh'){
            this.props.objPresent[this.props.activeObj].children[0].material.color.setHex(hex);
        }
        else if(this.props.objPresent[this.props.activeObj].objType==='Light'){
            this.props.objPresent[this.props.activeObj].children[0].color.setHex(hex);
        }
        this.props.objPresent[this.props.activeObj].hashColor=currentColor
    }
    render(){
        return(
            <Container>
                <Title>Fill</Title>
                <Trigger action={['click']} popup={<div><ColorPickerDropdown onChange={this.onChange} {...this.props} addInScene={this.props.addInScene} currentColor={this.state.currentColor}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                        points: ["tr", "bl"],
                        offset: [-335, -30],
                    }}
                    destroyPopupOnHide={true}    
                >
                    <Input style={{background:this.state.currentColor}}>
                    </Input>
                </Trigger>
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
const Input = styled.div`
    position: relative;
    float: right;
    width: 141px;
    height: 25px;
    border: 2px solid #DBDBDB;
    border-radius: 3px;
    margin-right: 6px;
    font-size: 10px;
    padding: 4px;
    color: #969696;
    cursor: pointer;
`