import React ,{Component} from 'react';
import styled from 'styled-components';
import boxBlue from '../../assets/boxBlue.svg';
import box from '../../assets/box.svg';
import general from '../../assets/general.svg';
import generalBlue from '../../assets/generalBlue.svg';
import cube from '../../assets/cube.svg';
import image from '../../assets/image.svg';
import model from '../../assets/model.svg';
import sky from '../../assets/sky.svg';
import text from '../../assets/text.svg';
import sun from '../../assets/sun.svg';
import MenuDropdownBasic from './MenuDropdown/MenuDropdownBasic'
import MenuDropdownLight from './MenuDropdown/MenuDropdownLight'
import MenuDropdownEnv from './MenuDropdown/MenuDropdownEnv'
import MenuDropdownObj from './MenuDropdown/MenuDropdownObj'
import Trigger from 'rc-trigger'


export default class MenuBar extends Component{

    
    render(){
        const { scene } = this.props;

        return(
            <MenuContainer>
                <Trigger action={['click']} popup={<div><MenuDropdownBasic scene={scene} addInScene={this.props.addInScene}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["br", "tr"],
                    offset: [10, -3],
                }}>
                    <ImgContainer src={cube} alt='General'/>
                </Trigger>
                <Trigger action={['click']} popup={<div><MenuDropdownLight scene={scene} addInScene={this.props.addInScene}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["br", "tr"],
                    offset: [10, -3],
                }}>
                    <ImgContainerCircle src={sun} alt='General'/>
                </Trigger>
                <Trigger action={['click']} popup={<div><MenuDropdownEnv scene={scene} addInScene={this.props.addInScene}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["br", "tr"],
                    offset: [10, -3],
                }}>
                    <ImgContainerCircle src={sky} alt='General'/>
                </Trigger>
                <ImgContainer src={text} alt='General'/>
                <ImgContainer src={image} alt='General'/>
                <Trigger action={['click']} popup={<div><MenuDropdownObj scene={scene} addInScene={this.props.addInScene}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["br", "tr"],
                    offset: [10, -3],
                }}>
                    <ImgContainer src={model} alt='General'/>
                </Trigger>        
                <ImgContainerAbs src={!this.props.setMode?generalBlue:general} alt='General' bottom={53} onClick={()=>{this.props.changeSetMode(false)}}/>
                <ImgContainerAbs src={this.props.setMode?boxBlue:box} alt='Scene' bottom={14} onClick={()=>{this.props.changeSetMode(true)}}/>
            </MenuContainer>
        )
    }
} 


const MenuContainer = styled.div`
    position:relative;
    float:left;
    width: 41px;
    height: 100%;
    z-index: 90;
    background: #F7F7F7;
    border-right: 2px solid #DBDBDB;
`

const ImgContainer = styled.img`
    position:relative;
    width: 45%;
    margin-left: 25%;
    margin-top: 17px;
    cursor:pointer;
    &::before {
        content: "";
        position:absolute;
        width:50px;
        height:25px;
        background:#000;
    }
`

const ImgContainerCircle = styled.img`
    position:relative;
    width: 50%;
    margin-left: 21%;
    margin-top: 17px;
    cursor:pointer;
`

const ImgContainerAbs = styled.img`
    position:absolute;
    width: 50%;
    bottom: ${props=>props.bottom+'px'};
    left:0px;
    right:0px;
    margin-left:auto;
    margin-right:auto;
`

