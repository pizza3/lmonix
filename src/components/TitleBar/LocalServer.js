import React ,{Component} from 'react'
import styled from 'styled-components'
import img from '../../assets/GoogleCardboard.png'
const electron =  window.require('electron');

export default class LocalServer extends Component{
    state={
    }

    handleServer = ()=>{
        electron.ipcRenderer.send("startlocal",{location:this.props.location})
    }
    render(){
        return(
            <PopContainer>
                <Header>Preview</Header>
                <Logo src={img}/>
                <Desc>To preview your creation's you can start the localhost server and access it on any device within the same network.</Desc>
                <StartButton onClick={this.handleServer}>Start Server</StartButton>
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

const Desc = styled.div`
    font-size: 10px;
    font-weight: 500;
    text-align: center;
    color: #a9a9a9;
    margin-top: 19px;
`

const Logo = styled.img`
    width: 86px;
    position: relative;
    margin-left: 30%;
    margin-top: 15px;
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