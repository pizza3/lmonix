
import React,{Component} from 'react';
import styled from 'styled-components';
import run from '../assets/run.svg';
import preview from '../assets/preview.svg';
import cloud from '../assets/cloud.svg';
import { Link } from "react-router-dom";

export default class TitleBar extends Component{
    state = {
        title:'untitled*'
    }

    render(){
        return(
            <TitleContainer id="titleBar">
                <Link to="/"><TitleLink>Design</TitleLink></Link>
                <Link to="/code"><TitleLink>Code</TitleLink></Link>
                <Title>{this.props.title}</Title>
                <ImgContainer src={cloud} alt='Upload'/>
                <ImgContainer src={preview} alt='Preview'/>
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
    padding-top: 10px;
    padding-left: 81px;
    border-bottom: 2px solid #DBDBDB;
    -webkit-user-select: none;
    -webkit-app-region: drag;
`

const ImgContainer = styled.img`
    position:relative;
    float:right;
    height: 15px;
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
`