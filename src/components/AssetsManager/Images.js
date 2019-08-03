import React ,{Component} from 'react';
import styled from 'styled-components';
// import add from '../../assets/add.svg';
import _ from 'lodash'
import Trigger from 'rc-trigger'
import Poly from './Poly'
import logo from '../../assets/polylogo.svg'
const electron =  window.require('electron');

export default class Images extends Component{
    handleAddAsset=()=>{
        electron.ipcRenderer.send("open-asset-modal",{location:this.props.location, filter:this.props.filterBy})
    }
    render(){
        const {assetStack}= this.props
        const filterAssets = assetStack.filter((val,i)=>{
            return _.includes(this.props.filterBy,val.ext.slice(1)) 
        })
        const Images = filterAssets.map((val,i)=>{
            return(
                <Item key={i}>
                    <Name>{val.name}</Name>
                    {/* <Trash src={trash}/> */}
                </Item>
            )
        })
        return(
            <Wrapper>
                <Header>
                    <Title>{this.props.titleName}</Title>
                    {/* <Add src={add} onClick={this.handleAddAsset}/> */}
                </Header>
                {this.props.titleName==='Models'?
                    <Trigger action={['click']} popup={<div><Poly title={this.props.title}/></div>} prefixCls='dropdown' 
                        popupAlign={{
                        points: ["br", "tr"],
                        offset: [10, -3],
                    }}>
                        <Button>Add from Poly<Logo src={logo}/></Button>                
                    </Trigger>                    
                :null}
                {Images}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position:relative;
    width:100%;
    height:auto;
    float: left;
    padding: 15px 7px 0px 7px;
`

const Header = styled.div`
    position:relative;
    width:100%;
    height:19px;
`
const Title = styled.div`
    position:relative;
    float:left;
    font-size: 12px;
    color: #b7b7b7;
    font-weight:500;
`

const Add = styled.img`
    position:relative;
    float:right;
    width: 14px;
    padding: 3px;
    background: #e0e0e0;
    border-radius: 2px;
        &:hover{
        background: #c7c7c7;
    }
`

const Name = styled.span`
    width: 90%;
    height: 100%;
    position: relative;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Item = styled.div`
    position: relative;
    width: 100%;
    height: 21px;
    font-size: 10px;
    color: #b7b7b7;
    padding: 4px 4px 0px 4px;
    transition:0.3s;
    border-radius: 2px;
    &:hover{
        background: #dedede;
        color: #4a87ff;
    }
`
const Trash = styled.img`
    position:relative;
    float:right;
    width: 8px;
    margin-top: 1px;
`

const Button = styled.button`
    position: relative;
    width: 100%;
    height: 25px;
    border-radius: 3px;
    background: #2F79EF;
    color: #fff;
    font-weight: 700;
    font-size: 10px;
    border: none;
    margin-top: 2px;
    margin-bottom: 12px;
    &:hover{
        background: #186AEB;
    }
`
const Logo = styled.img`
    width: 12px;
    position: absolute;
    margin-left: 3px;

`