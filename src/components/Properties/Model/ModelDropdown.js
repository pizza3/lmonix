import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../../helpers/ThreeLibManager";
import * as MaterialLoader from "three-mtl-loader";
import * as ObjectLoader from "../../../helpers/three-obj-loader";
import { texture, addCircle, polyLogo, folder } from "../../../assets/icon";
import modelLoader from "../../../helpers/modelLoader";
import message from "antd/lib/message/index";
import Tooltip from '../../../designLib/Tooltip';
import Poly from './Poly';
import _ from 'lodash';
const fs = window.require("fs");
const electron = window.require("electron");
const Loader = new THREE.OBJLoader();
const OBJLoader = ObjectLoader.default;
const MTLLoader = MaterialLoader.default;
const path = window.require("path");
OBJLoader(THREE);

// const gltfLoader = new THREE.LegacyGLTFLoader();
const gltfLoader = new THREE.GLTFLoader();

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
  handleTexture = directory => {
    const { changeObjectProp } = this.props;
    modelLoader(this.props.active, directory, changeObjectProp);
  };

  applyPolyTexture = (data) => {
    const {changeObjectProp} = this.props
    const format = data.formats.find( format => { return format.formatType === 'GLTF2'; } );
    if ( format !== undefined ) {
      const url = format.root.url;
      gltfLoader.load( url, function ( response ) {
        changeObjectProp(response.scene, "", "addObject");
      });
      changeObjectProp(
        {
          path: format.root.url,
          ext: "poly",
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
        filter: ["obj", "mtl"],
        type:'openDirectory',
        properties:["openDirectory"]
      });
    } else {
      message.warning("Project not saved, save it to add asset's.", 3);
    }
  };

  render() {
    const { assetStack } = this.props;
    const { showPoly } = this.state
    const Textures = assetStack.map((directory, i) => {
      if (directory.ext === ".obj"||directory.ext === ".gltf") {
        return (
          <ObjButton
            key={i}
            style={{ width: "100%" }}
            onClick={() => {
              this.handleTexture(directory);
            }}
          >
            <FolderSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {folder()}
            </FolderSvg>
            <Text>
              <Span>Name: </Span>
              {directory.name}
            </Text>
            <Text>
              <Span>Type: </Span>
              {directory.ext}
            </Text>
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
                No Model's available. Add them by clicking "+" button.
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

// const Text = styled.span`
//   top: 10px;
//   position: relative;
//   margin-left: 11px;
// `;

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

const FolderSvg = styled.svg`
  position:relative;
  float:left;
  width:36px;
`

const Span = styled.span`
  font-size: 10px;
  font-weight: 700;
  float: left;
  margin-right: 5px;
`;

const Text = styled.span`
  top: 0px;
  position: relative;
  font-size: 11px;
  width: 173px;
  float: left;
  font-weight: 400;
  padding-left: 11px;
  text-align: left;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
