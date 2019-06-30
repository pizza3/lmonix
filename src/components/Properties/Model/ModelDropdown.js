import React,{Component} from 'react'
import styled from 'styled-components'
import * as THREE from '../../ThreeLibManager';
// import {
//     MTLLoader,
//     TransformControls,
//     PointerLockControls
//   } from "../../ThreeLibManager";
const fs =  window.require('fs');
const Loader = new THREE.OBJLoader();
export default class MenuDropdown extends Component{
    addModel = (obj) => {
        this.props.addInScene(obj)
    }
    handleTexture=(i)=>{
        const data = "data:video/webm;base64,"+fs.readFileSync(this.props.assetStack[i].path).toString('base64')
        const data2 =fs.readFileSync(this.props.assetStack[i].path.replace('obj','mtl'))  
        // if(this.props.assetStack[i].ext==='.obj'){
        //     let objPresent = this.props.active
        //     // load a resource
        //     Loader.load(
        //         // resource URL
        //         data,
        //         // called when resource is loaded
        //         function ( object ) {
        //             objPresent.add(object)
        //         },
        //         // called when loading is in progresses
        //         function ( xhr ) {

        //             console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        //         },
        //         // called when loading has errors
        //         function ( error ) {

        //             console.log( 'An error happened' );

        //         }
        //     );      
        let objPresent = this.props.active
        let mtlLoader = new THREE.MTLLoader();
        console.log(this.props.assetStack[i].path.replace('obj','mtl'));
        mtlLoader.setPath(data2);
        mtlLoader.load(data2, function(materials) {
            materials.preload();
            console.log(materials);
            
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        // objLoader.setPath('obj/male02/');
        objLoader.load(data, function(object) {
            objPresent.add(object);
        });
        },function(xhr) {
            console.log( xhr.loaded, xhr.total);
            
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            
        },function(error) {
            console.log( 'An error happened' );
            
        })
        this.props.active.objModel = {path:this.props.assetStack[i].path,type:'.obj',name:this.props.assetStack[i].name.replace(/[\W_]+/g,"")}
        
    }

    render(){
        const { assetStack } = this.props;
        const Textures = assetStack.map((val,i)=>{
            if(val.ext==='.obj'){
                return(
                    <ObjButton key={i} style={{width:'100%'}} onClick={()=>{this.handleTexture(i)}}>
                        <Img src={this.props.assetStack[i].base}/>
                        <Text>{val.name}</Text>
                    </ObjButton>
                )
            }
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