import React ,{Component} from 'react';
import styled from 'styled-components';
import add from '../../assets/add.svg';
import trash from '../../assets/trash.svg';
const electron =  window.require('electron');


export default class Videos extends Component{

    handleAddAsset=()=>{
        electron.ipcRenderer.send("open-asset-modal",{location:this.props.location})
    }

    render(){
        const {assetStack}= this.props
        const Images = assetStack.map((val,i)=>{
            return(
                <Item>{val.name}
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
const Item = styled.div`
    position: relative;
    width: 100%;
    height: 21px;
    font-size: 10px;
    color: #b7b7b7;
    padding: 4px 4px 0px 4px;
    transition:0.3s;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
