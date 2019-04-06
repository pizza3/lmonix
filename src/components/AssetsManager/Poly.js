import React, {Component} from 'react';
import styled from 'styled-components';
import {getPolyData} from './api'
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
            console.log(data);
            
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
            console.log(data);
        })
    }

    render(){
        let images = this.state.data.map((val,i)=>{
            return <Img key={i} src={val.thumbnail.url}/>
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
const Img = styled.img`
    width: 48%;
    margin-right: 6px;
    border-radius: 4px;
    margin-bottom: 7px;
`
const ImgContainer = styled.div`
    margin-top: 46px;

`