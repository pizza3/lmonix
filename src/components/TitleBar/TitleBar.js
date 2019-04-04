
import React,{Component} from 'react';
import styled from 'styled-components';
import run from '../../assets/run.svg';
import preview from '../../assets/preview.svg';
import cloud from '../../assets/cloud.svg';
import CloudExport from './CloudExport'
import LocalServer from './LocalServer'
import { Link } from "react-router-dom";
import Trigger from 'rc-trigger'

export default class TitleBar extends Component{
    state = {
        title:'untitled*'
    }

    render(){
        return(
            <TitleContainer id="titleBar">
                <TitleOverlay/>
                <Link to="/"><TitleLink>Design</TitleLink></Link>
                <Link to="/code"><TitleLink>Code</TitleLink></Link>
                <Title>{this.props.title}</Title>
                <Trigger action={['click']} popup={<div><CloudExport/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["bc", "tl"],
                    offset: [-210, 30],
                }}>
                    <ImgContainer src={cloud} alt='Upload'/>
                </Trigger>
                <Trigger action={['click']} defaultPopupVisible={true} popup={<div><LocalServer location={this.props.title}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                    points: ["bc", "tl"],
                    offset: [-210, 30],
                }}>
                    <ImgContainer src={preview} alt='Preview'/>
                </Trigger>
                <ImgContainer src={run} alt='Run Scene'/>
            </TitleContainer>
        )
    }
}

const TitleContainer = styled.div`
    position:fixed;
    width: 100%;
    height: 37px;
    z-index: 100;
    background: #F7F7F7;
    border-bottom: 2px solid #DBDBDB;

`

const TitleOverlay = styled.div`
    position:absolute;
    height:100%;
    width:100%;
    -webkit-user-select: none;
    -webkit-app-region: drag;
`

const ImgContainer = styled.img`
    position:relative;
    float:right;
    height: 15px;
    margin-top: 10px;
    margin-right: 27px;
`

const Title = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: #8a8a8a;
    font-size: 12px;
    font-weight: 600;
    top: 10px;
`
const TitleLink = styled.div`
    position: relative;
    float: left;
    font-weight: 500;
    color: #707070;
    font-size: 13px;
    margin-right: 15px;
    padding-bottom: 6px;
    border-bottom: 3px solid #707070;
    margin-top: 10px;
    margin-left: 85px;
`