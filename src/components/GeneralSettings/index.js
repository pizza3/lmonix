import React,{Component} from 'react'
import styled from 'styled-components';
import Cursor from './Cursor'
import DefaultLights from './DefaultLights'

export default class Index extends Component{
    render(){
        return(
            <div>
                <Title>Settings</Title>
                <Cursor {...this.props}/>
                <DefaultLights {...this.props}/>
            </div>
        )
    }
}

const Title = styled.div`
    position: relative;
    float: left;
    color: #969696;
    font-size: 15px;
    margin-left: 5px;
    font-weight: 600;
    width: 100%;
`