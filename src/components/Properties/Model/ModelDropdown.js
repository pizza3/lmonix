import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../../Helpers/ThreeLibManager";
import * as MaterialLoader from "three-mtl-loader";
import * as ObjectLoader from "../../../Helpers/three-obj-loader";
import { texture, addCircle, polyLogo } from "../../../assets/icon";
import modelLoader from "../../../Helpers/modelLoader";
import { message } from "antd";
import Tooltip from '../../../designLib/Tooltip'
import Poly from './Poly'
// import LegacyGLTFLoader from '../../../Helpers/LegacyGLTFLoader'
const fs = window.require("fs");
const electron = window.require("electron");
const Loader = new THREE.OBJLoader();
const OBJLoader = ObjectLoader.default;
const MTLLoader = MaterialLoader.default;
OBJLoader(THREE);
const modelExt = [".obj"];

// const gltfLoader = new THREE.LegacyGLTFLoader();
var gltfLoader = new THREE.GLTFLoader();

export default class MenuDropdown extends Component {
  state={
    showPoly:false
  }
  addModel = obj => {
    this.props.addInScene(obj);
  };
  handleShowPoly = ()=>{
    const { showPoly } = this.state
    this.setState({
      showPoly: !showPoly
    })
  }
  handleTexture = i => {
    const { changeObjectProp, assetStack } = this.props;
    const objData =
      "data:video/webm;base64," +
      fs.readFileSync(assetStack[i].path).toString("base64");
    const mtlData =
      "data:video/webm;base64," +
      fs
        .readFileSync(assetStack[i].path.replace("obj", "mtl"))
        .toString("base64");
    const materials = new MTLLoader();
    let objPresent;
    modelLoader(this.props.active, {
      name: assetStack[i].name.replace(/[\W_]+/g, "")
    });
    // materials.load(mtlData, function(material) {
    //   material.preload();
    //   const loader = new THREE.OBJLoader();
    //   loader.setMaterials(material);
    //   Loader.load(
    //     objData,
    //     function(object) {
    //       changeObjectProp(object, "", "addObject");
    //       changeObjectProp(
    //         {
    //           path: assetStack[i].path,
    //           type: ".obj",
    //           name: assetStack[i].name.replace(/[\W_]+/g, "")
    //         },
    //         "objModel"
    //       );
    //     },
    //     function(xhr) {
    //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     function(error) {
    //       console.log("An error happened");
    //       console.log(error);
    //     }
    //   );
    // });


    changeObjectProp(
      {
        path: assetStack[i].path,
        type: ".obj",
        name: assetStack[i].name.replace(/[\W_]+/g, "")
      },
      "objModel"
    );
  };

  applyPolyTexture = (data) => {
    console.log(data);
    const {changeObjectProp} = this.props
    const format = data.formats.find( format => { return format.formatType === 'GLTF2'; } );
    console.log(format);
    if ( format !== undefined ) {
      const url = format.root.url;
      gltfLoader.load( url, function ( response ) {
        changeObjectProp(response.scene, "", "addObject");
      });
      changeObjectProp(
        {
          path:  format.root.url,
          type: "poly",
          name: data.displayName
        },
        "objModel"
      );
    }
  }

  handleAddModel = () => {
    if (this.props.location !== "untitled*") {
      electron.ipcRenderer.send("open-asset-modal", {
        location: this.props.location,
        filter: ["obj", "mtl"]
      });
    } else {
      message.warning("Project not saved, save it to add asset's.", 3);
    }
  };

  render() {
    const { assetStack } = this.props;
    const { showPoly } = this.state
    const Textures = assetStack.map((val, i) => {
      if (val.ext === ".obj") {
        return (
          <ObjButton
            key={i}
            style={{ width: "100%" }}
            onClick={() => {
              this.handleTexture(i);
            }}
          >
            <Img src={this.props.assetStack[i].base} />
            <Text>{val.name}</Text>
          </ObjButton>
        );
      }
    });
    return (
      <Container>
        <Title>Models</Title>
        <Tooltip align='bottom' name='Add Model'>
          <Add
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={this.handleAddModel}
          >
            {addCircle("#4f74f9")}
          </Add>
        </Tooltip>
        <Tooltip align='bottom' name='Google Poly'>
          <PolySvg showPoly={showPoly} onClick={this.handleShowPoly} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="1039.7 146.3 309.3 357.2">
            {polyLogo}
          </PolySvg>
        </Tooltip>
        {showPoly?
          <Poly applyPolyTexture={this.applyPolyTexture}/>
          :
        Textures.length ? (
            Textures
          ) : (
            <>
              <TextureIcon>{texture}</TextureIcon>
              <Message>
                No Model's available. Add them from General > Assets > Images.
              </Message>
            </>
          )
        }
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  overflow: auto;
  background: #1b1b1b;
  border: 2px solid #2d2d2d;
  width: 255px;
  height: 255px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 0px 35px -12px rgba(0, 0, 0, 0.75);
`;

const ObjButton = styled.button`
  width: 100%;
  height: 76px;
  border: none;
  border-bottom: 2px solid #2d2d2d;
  background: none;
  color: #8a8a8a;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
  &:hover {
    background: #4f74f9;
    color: #ececec;
  }
`;

const Img = styled.img`
  width: auto;
  height: 34px;
  float: left;
  position: relative;
`;

const Text = styled.span`
  top: 10px;
  position: relative;
  margin-left: 11px;
`;

const Title = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 35px;
  background: #1b1b1b;
  border-bottom: 2px solid #2d2d2d;
  padding-left: 5px;
  color: #ececec;
  font-weight: bold;
  font-size: 27px;
`;

const Add = styled.svg`
  position: absolute;
  right: 3px;
  top: 2px;
  width: 28px;
`;

const TextureIcon = styled.div`
  text-align: center;
  margin-top: 77px;
`;

const Message = styled.div`
  text-align: center;
  position: absolute;
  font-size: 9px;
  font-weight: 500;
  text-align: -webkit-center;
  color: #a9a9a9;
  padding: 22px;
`;


const PolySvg = styled.svg`
    position: absolute;
    right: 35px;
    top: 4px;
    width: 21px;
    transition: 0.2s;
    filter: ${props=>props.showPoly?"grayscale(0)":"grayscale(1)"};
`