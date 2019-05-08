import React ,{Component} from 'react';
import styled from 'styled-components';
import OpacityRange from './OpacityRange'

export default class Index extends Component{
    state = {
        currentTexture:'Add Model'
    }
    render(){
        return(
            <Container>
                <Title>Opacity</Title>
               <div><OpacityRange {...this.props} addInScene={this.props.addInScene}/></div>
            </Container>
        )
    }
}

const Container = styled.div`
    position:relative;
    float:left;
    width:100%;
    height:44px;
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
    background: #DBDBDB;
    border-radius: 3px;
    margin-right: 6px;
    font-size: 10px;
    padding: 4px;
    color: #969696;
    cursor: pointer;
`