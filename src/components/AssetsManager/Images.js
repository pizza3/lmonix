import React ,{Component} from 'react';
import styled from 'styled-components';
import add from '../../assets/add.svg';
import trash from '../../assets/trash.svg';
import _ from 'lodash'
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
                    <Trash src={trash}/>
                </Item>
            )
        })
        return(
            <Wrapper>
                <Header>
                    <Title>{this.props.titleName}</Title>
                    <Add src={add} onClick={this.handleAddAsset}/>
                </Header>
                {Images}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position:relative;
    width:100%;
    height:auto;
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
