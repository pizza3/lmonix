import React, {Component} from 'react';
import styled from 'styled-components';
import {getPolyData} from './api'
const https = window.require('https');
const fs = window.require('fs');
const electron =  window.require('electron');

export default class Poly extends Component{

    state={
        value:'car',
        data:[]
    }
    componentDidMount(){
        getPolyData(this.state.value).then(obj => {
            let data = obj.assets
            this.setState({
                data
            })            
        })
    }

    handleChange=(e)=>{
        this.setState({ 
            value:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        getPolyData(this.state.value).then(obj => {
            let data = obj.assets
            this.setState({
                data
            })
        })
    }
    handleAddModel=(data)=>{
        console.log(this.props);
        
        const {title}=this.props
        let file
        data.formats.forEach((obj,i) => {
            if(obj.formatType='OBJ'){
                console.log(data);
                electron.ipcRenderer.send("addModel",{title:this.props.title, obj:obj, name:data.displayName.replace(/\s/g, '')})
            }
        })
    }
    render(){
        let images = this.state.data.map((val,i)=>{
            return (
                <ImgCont key={i}>
                 <Img key={i} src={val.thumbnail.url}/>
                 <Add onClick={()=>{this.handleAddModel(val)}}>+</Add>
                </ImgCont>
            )
        })
        return(
            <Container>
                <InputContainer>
                    <form onSubmit={this.handleSubmit}>
                        <Input type='text' placeholder='Search for models' value={this.state.value} onChange={this.handleChange}/>                
                    </form>
                </InputContainer>
                <ImgContainer>
                    {images}
                </ImgContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    position: fixed;
    background: #F7F7F7;
    border: 2px solid #DBDBDB;
    width: 340px;
    height: 255px;
    z-index: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
    padding: 0px 6px 0px 6px;
    overflow:auto;
`
const Input = styled.input`
    width: 324px;
    background: #e0e0e0;
    border: 1px solid #d0d0d0;
    height: 31px;
    border-radius: 4px;
    position: fixed;
    font-weight: 700;
    font-size: 16px;
    padding-left: 5px;
`
const InputContainer = styled.div`
    width: 100%;
    height: 43px;
    position: fixed;
    background: #F7F7F7;
    padding-top: 6px;
`
const ImgCont = styled.div`
    width: 48%;
    position: relative;
    float: left;
    margin-right: 6px;
    border-radius: 4px;
    margin-bottom: 7px;
    overflow: hidden;
`

const Img = styled.img`
    width: 100%;
`
const ImgContainer = styled.div`
    margin-top: 46px;

`

const Add = styled.button`
    position: absolute;
    width: 31px;
    height: 31px;
    left: 4px;
    bottom: 7px;
    background: #2F79EF;
    border: 1px solid #68a2ff;
    color: #fff;
    border-radius: 50%;
`