import React,{Component} from 'react'
import styled from 'styled-components'
import {AddSky, AddText}  from '../AddModel';

export default class MenuDropdown extends Component{
    addModel = (obj) => {
        this.props.addInScene(obj)
    }

    render(){
        const { scene } = this.props;
        return(
            <Container>
               <ObjButton style={{width:'100%'}} onClick={()=>{this.addModel(AddSky(scene))}}>Sky</ObjButton>
               <ObjButton style={{width:'100%'}} onClick={()=>{this.addModel(AddText(scene))}}>Text</ObjButton>
            </Container>
        )
    }
}

const Container = styled.div`
    position: fixed;
    background: #F7F7F7;
    border: 2px solid #DBDBDB;
    width: 200px;
    height: 180px;
    z-index: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
`

const ObjButton = styled.button`
    width:100%;
    height: 27px;
    border: none;
    border-bottom: 1px solid #DBDBDB;
    background: none;
    color: #8a8a8a;
    font-size: 12px;
    font-weight: 600;
    cursor:pointer;
    outline:none;
    transition:0.3s;
    &:hover{
        background: #DBDBDB;
        color: #2F79EF;
    }
`