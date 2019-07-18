import React, {Component} from 'react'
import styled from 'styled-components';


export default class Material extends Component {
    state={
        value:"MeshPhongMaterial"
    }
    handleChange=(event)=> {
        this.setState({value: event.target.value});
        this.props.setMaterial(event.target.value)
    }
    render(){
        return(
            <Container>
                <Title>Shading</Title>
                <Select value={this.state.value} onChange={this.handleChange}>
                    <option value="MeshStandardMaterial">Standard</option>
                    <option value="MeshBasicMaterial">Flat</option>
                </Select>
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
const Select = styled.select`
    float: right;
    margin-right: 7px;
    width: 141px;
    background: #DBDBDB;
    border: none;
    color: #969696;
    outline:0;
    height: 25px;
    border-radius: 2px;
    line-height: 10px;
    font-size: 10px;
`