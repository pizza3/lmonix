import React,{Component} from 'react'
import styled from 'styled-components'
// import {AddCube,AddSphere,AddPlane}  from '../../MenuBar/AddModel';
import * as THREE from '../../ThreeLibManager';
// import {remote} from 'electron
const fs =  window.require('fs');
// var fs= require('fs') 
// import img from '../../../../../wood2.jpg'
export default class MenuDropdown extends Component{
    addModel = (obj) => {
        this.props.addInScene(obj)
    }
    handleTexture=(i)=>{
        console.log(fs);
        let data = "data:image/png;base64,"+fs.readFileSync(this.props.assetStack[i].path).toString('base64')
        let texture = new THREE.TextureLoader().load(
            data,
            function ( texture ) {
                // do something with the texture
                // material = new THREE.MeshBasicMaterial( {
                //     map: texture
                //  } );
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log( 'An error happened' );
            }
        );

        // let texture =new THREE.TextureLoader().load('../../../assets/project/Assets/'+this.props.assetStack[i].name) 
        this.props.objPresent[this.props.activeObj].children[0].material.map = texture;
        this.props.objPresent[this.props.activeObj].children[0].material.needsUpdate = true;        
    }

    render(){
        const { assetStack } = this.props;
        const Textures = assetStack.map((val,i)=>{
            console.log(val.texture);
            
            return(
                <ObjButton key={i} style={{width:'100%'}} onClick={()=>{this.handleTexture(i)}}>
                    <Img src={this.props.assetStack[i].base}/>
                    <Text>{val.name}</Text>
                </ObjButton>
            )
        })
        return(
            <Container>
              {Textures||"Nothing"}
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
    height: 46px;
    border: none;
    border-bottom: 1px solid #DBDBDB;
    background: none;
    color: #8a8a8a;
    font-size: 12px;
    font-weight: 600;
    cursor:pointer;
    outline:none;
    transition:0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 6px;
    &:hover{
        background: #DBDBDB;
        color: #2F79EF;
    }
`

const Img = styled.img`
    width: auto;
    height: 34px;
    float: left;
    position: relative;
`

const Text = styled.span`
    top: 10px;
    position: relative;
    margin-left: 11px;

`