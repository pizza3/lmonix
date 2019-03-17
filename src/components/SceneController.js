import React ,{Component} from 'react';
import styled from 'styled-components';
import walk from '../assets/walk.svg';
import grid from '../assets/grid.svg';
import scale from '../assets/scale.svg';
import rotate from '../assets/rotate.svg';
import translate from '../assets/translate.svg';
import walkWhite from '../assets/walkWhite.svg';
import scaleWhite from '../assets/scaleWhite.svg';
import rotateWhite from '../assets/rotateWhite.svg';
import translateWhite from '../assets/translateWhite.svg';
import { Tooltip } from 'antd';

export default class SceneController extends Component{
    state = {
        active:false,
        activeLogo:3
    }

    handleOver = () =>{
        this.setState({
            active:true
        }) 
    }

    handleLeave = () =>{
        this.setState({
            active:false
        })
    }

    handleTransform = (val) =>{
        switch (val) {
            case "translate":
                this.props.transformControls.setMode("translate");
                this.setState({
                    activeLogo:3
                })
                break;
            case "rotate":
                this.props.transformControls.setMode("rotate");
                this.setState({
                    activeLogo:2
                })
                break;
            case "scale":
                this.props.transformControls.setMode("scale");
                this.setState({
                    activeLogo:1
                })
                break;
            case "walk":
                // this.props.transformControls.setMode("scale");
                this.setState({
                    activeLogo:0
                })
                break;
            default:
                this.props.transformControls.setMode("translate");
        }
    }

    render(){
        const logo = [walkWhite,scaleWhite,rotateWhite,translateWhite];
        const SceneControllerContainer = styled.div`
            position: absolute;
            z-index: 102;
            width: ${this.state.active?'125px':'90px'};
            height: ${this.state.active?'132px':'99px'};
            left: 232px;
            padding: 16px 0px 0px 7px;
            border-bottom-right-radius: 48px;
            border-bottom-left-radius: 26px;
            border-top-left-radius: 76px;
            border-top-right-radius: 37px;
        `
        return(
            <SceneControllerContainer onMouseLeave={this.handleLeave}>
                <ActiveController active={this.state.active} onMouseEnter={this.handleOver}>
                    <ActiveImg src={logo[this.state.activeLogo]}></ActiveImg>
                </ActiveController>
                <SelectController active={this.state.active} pos={{x:1,y:80}} onClick={()=>{this.handleTransform('walk')}}>
                    <Img src={walk}/>
                </SelectController>
                <SelectController id='grid' active={this.state.active} pos={{x:39,y:81}}>
                    <Img src={grid}/>                
                </SelectController>
                <SelectController active={this.state.active} pos={{x:71,y:60}} onClick={()=>{this.handleTransform('scale')}}>
                    <Img src={scale}/>
                </SelectController>
                <SelectController active={this.state.active} pos={{x:83,y:24}} onClick={()=>{this.handleTransform('rotate')}}>
                    <Img src={rotate}/>            
                </SelectController>
                <SelectController active={this.state.active} pos={{x:73,y:-13}} onClick={()=>{this.handleTransform('translate')}}>
                    <Tooltip title="Translate">
                    <Img src={translate}/>
                    </Tooltip>
                </SelectController>
            </SceneControllerContainer>
        )
    }
}

const ActiveController = styled.div`
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${props => props.active?'#186AEB':'#2F79EF'};
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.25);
    border: 2px solid #5F9DFF;
`

const SelectController = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    background: #F7F7F7;
    border-radius: 50%;
    border: 2px solid #DBDBDB;
    opacity:${props => props.active?1:0};            
    transform: translateX(${props => props.pos['x']+'px'})  translateY(${props => props.pos['y']+'px'});
    transition: 0.2s;
    cursor:pointer;

    &:hover{
        background: #DBDBDB;
    }
`

const Img = styled.img`
    position: absolute;
    width: 13px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
`

const ActiveImg = styled.img`
    position: absolute;
    width: 24px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
`