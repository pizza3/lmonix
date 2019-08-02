import React ,{Component} from 'react';
import styled from 'styled-components';
import Trigger from 'rc-trigger'
import ColorPickerDropdown from './ColorPickerDropdown'
import _ from 'lodash'
const element = document.getElementById('properties-scroll')
export default class ColorPicker extends Component{
    state = {
        currentColor:'#fff'
    }
    componentDidMount(){
        this.onChange(this.props.active.hashColor)
    }
    componentDidUpdate(prevProps){        
        if(!_.isEqual(prevProps.active,this.props.active)){
            this.onChange(this.props.active.hashColor)
        }
    }
    onChange=(currentColor)=>{
        this.setState({
            currentColor
        })
        let hex = parseInt(currentColor.replace(/^#/, ""), 16);
        if(this.props.active.objType==='Mesh'){
            this.props.changeObjectProp(currentColor,'color','colorMaterial')
        }
        else if(this.props.active.objType==='Light'){
            this.props.changeObjectProp(currentColor,'color','colorLight')
        }
    }
    render(){
        return(
            <Container>
                <Title>Fill</Title>
                <Trigger action={['click']} popup={<div><ColorPickerDropdown onChange={this.onChange} {...this.props} addInScene={this.props.addInScene} currentColor={this.state.currentColor}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                        points: ["tr", "bl"],
                        offset: [-345, -30],
                    }}
                    destroyPopupOnHide={true}    
                    // getPopupContainer={()=>document.getElementById('properties-scroll')}
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
    border-radius: 3px;
    margin-right: 6px;
    font-size: 10px;
    padding: 4px;
    color: #969696;
    cursor: pointer;
`