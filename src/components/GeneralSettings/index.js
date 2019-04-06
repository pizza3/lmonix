import React,{Component} from 'react'
import styled from 'styled-components';


export default class Index extends Component{
    state={

    }

    render(){
        return(
            <>
            <Title>Settings</Title>
            </>
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