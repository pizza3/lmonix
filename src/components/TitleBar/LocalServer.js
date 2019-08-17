import React ,{Component} from 'react'
import styled from 'styled-components'
import {vrLogo} from '../../assets/icon'
import message from "antd/lib/message/index";
const electron =  window.require('electron');

export default class LocalServer extends Component{
    state={
        status:true,
    }
    handleServer = ()=>{
        const{status}=this.state
        if(this.props.location!=='untitled*'){
            if(!status){
                this.setState({
                    status:true
                })
                electron.ipcRenderer.send("stoplocal",{location:this.props.location})
            }
            else{
                electron.ipcRenderer.send("startlocal",{location:this.props.location})  
                  this.setState({
                    status:false,
                })        
            }
        }
        else{
            message.warning('Project not saved, please save it to run preview.',3)
        }
    }
    render(){
        const{status}=this.state
        return(
            <PopContainer>
                <Header>Preview</Header>
                <Logo src={vrLogo}/>
                {status?
                <Cont>
                <Desc>To preview your creation's you can start the localhost server and access it on any device within the same network.</Desc>
                </Cont>
                :
                <Cont>
                    <Desc>Access your scene at the following url.</Desc>
                    <Url>{this.props.ip+':9999'}</Url> 
                </Cont>
                }
                <StartButton onClick={this.handleServer}> {status?'Start Server':'Stop Server'}</StartButton>
            </PopContainer>
        )
    }
}

const PopContainer = styled.div`
    width: 248px;
    position: fixed;
    height: 295px;
    border-radius: 4px;
    z-index: 100;
    padding: 15px;
    background: #1b1b1b;
    border: 2px solid #2d2d2d;
`

const Header = styled.div`
    font-weight: 800;
    color: grey;
    font-size: 22px;
    text-align: center;
`

const Desc = styled.div`
    font-size: 9px;
    font-weight: 500;
    text-align: -webkit-center;
    color: #a9a9a9;
    margin-top: 31px;
`

const Logo = styled.img`
    width: 86px;
    position: relative;
    margin-left: 32%;
    margin-top: 15px;
`

const Cont = styled.div`
    position: relative;
    height: 41px;
    padding: 0px 11px 0px 11px;
`

const Url = styled.div`
    position: relative;
    width: 130px;
    height: 25px;
    border-radius: 3px;
    background: #2d2d2d;
    font-size: 10px;
    text-align: center;
    padding-top: 6px;
    font-weight: 700;
    color: #636363;
    margin-left: 33px;
    margin-top: 4px;
`

const StartButton = styled.button`
    position: relative;
    width: 130px;
    height: 25px;
    border-radius: 3px;
    background: #4f74f9;
    color: #fff;
    font-weight: 700;
    font-size: 10px;
    border: none;
    margin-top: 33px;
    margin-left: calc(57% - 79px);
`