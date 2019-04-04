import React ,{Component} from 'react'

import styled from 'styled-components'


export default class CloudExport extends Component{
    state={

    }


    render(){
        return(
            <PopContainer>
                <Header>Deploy</Header>
                <StartButton>Start Deployment</StartButton>
            </PopContainer>
        )
    }
}


const PopContainer = styled.div`
    width: 230px;
    position: fixed;
    height: 260px;
    background: #faa;
    background: #f7f7f7;
    border-radius: 4px;
    border: 2px solid #d4d4d4;
    z-index: 100;
    padding: 15px;
`

const Header = styled.div`
    font-weight: 800;
    color: grey;
    font-size: 22px;
    text-align: center;
`

const StartButton = styled.button`
    position: relative;
    width: 130px;
    height: 25px;
    border-radius: 3px;
    background: #2F79EF;
    color: #fff;
    font-weight: 700;
    font-size: 10px;
    border: none;
    margin-top: 21px;
    margin-left: calc(50% - 65px);
    &:hover{
        background: #186AEB;
    }
`