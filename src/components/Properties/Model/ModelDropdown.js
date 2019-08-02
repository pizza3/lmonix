import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../ThreeLibManager";
import * as MaterialLoader from "three-mtl-loader";
import * as ObjectLoader from "../../Helpers/three-obj-loader";
import modelLoader from '../../Helpers/modelLoader' 
const fs = window.require("fs");
const Loader = new THREE.OBJLoader();
const OBJLoader = ObjectLoader.default;
const MTLLoader = MaterialLoader.default;
OBJLoader(THREE);

export default class MenuDropdown extends Component {
  addModel = obj => {
    this.props.addInScene(obj);
  };
  handleTexture = i => {
    const {changeObjectProp, assetStack}=this.props
    const data =
      "data:video/webm;base64," +
      fs.readFileSync(assetStack[i].path).toString("base64");
    const data2 =
      "data:video/webm;base64," +
      fs
        .readFileSync(assetStack[i].path.replace("obj", "mtl"))
        .toString("base64");
    const materials = new MTLLoader();
    let objPresent;
    modelLoader(this.props.active, {name:assetStack[i].name.replace(/[\W_]+/g, "") })
    // materials.load(data2, function(material) {
    //   material.preload();
    //   const loader = new THREE.OBJLoader();
    //   loader.setMaterials(material);
    //   // Load the resource
    //   loader.load(
    //     data,
    //     function(object) {
    //       object.material={}
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
    //       // Loading is in progress
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
              name: assetStack[i].name
            },
            "objModel"
          );

  };

  render() {
    const { assetStack } = this.props;
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
    return <Container>{Textures || "Nothing"}</Container>;
  }
}

const Container = styled.div`
  position: fixed;
  background: #f7f7f7;
  border: 2px solid #dbdbdb;
  width: 200px;
  height: 180px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
`;

const ObjButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
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
    background: #dbdbdb;
    color: #2f79ef;
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
