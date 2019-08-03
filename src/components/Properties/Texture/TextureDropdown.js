import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../ThreeLibManager";
import { texture } from "../../../assets/icon";
const fs = window.require("fs");
export default class MenuDropdown extends Component {
  addModel = obj => {
    this.props.addInScene(obj);
  };
  handleTexture = i => {
    const type = this.props.active.objPrimitive
    const data =
      "data:video/webm;base64," +
      fs.readFileSync(this.props.assetStack[i].path).toString("base64");
    if (this.props.assetStack[i].ext === ".mp4") {
      // sets up a basic video element
      let video = document.createElement("video");
      video.src = data;
      video.width = 640;
      video.height = 360;
      video.loop = true;
      video.muted = true;
      video.setAttribute("webkit-playsinline", "webkit-playsinline");
      video.play();
      const texture = new THREE.VideoTexture(video);
      const objTexture = {
        path: this.props.assetStack[i].path,
        type: "video",
        name: this.props.assetStack[i].name.replace(/[\W_]+/g, "")
      };
      this.props.changeObjectProp(texture, "map", "material");
      this.props.changeObjectProp(true, "needsUpdate", "material");
      this.props.changeObjectProp(objTexture, "objTexture");
    } else {
      const texture = new THREE.TextureLoader().load(
        data,
        function(texture) {},
        // Function called when download progresses
        function(xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // Function called when download errors
        function(xhr) {
          console.log("An error happened");
        }
      );
      const objTexture = {
        path: this.props.assetStack[i].path,
        type: "image",
        name: this.props.assetStack[i].name.replace(/[\W_]+/g, "")
      };
      const point = new THREE.Vector2(0.5, 0.5);
      texture.center = point;
      if(type!=='sky')texture.rotation = 3.14;
      this.props.changeObjectProp(texture, "map", "material");
      this.props.changeObjectProp(true, "needsUpdate", "material");
      this.props.changeObjectProp(objTexture, "objTexture");
      this.props.checkForTexture();
    }
  };
  render() {
    const { assetStack } = this.props;
    const Textures = assetStack.map((val, i) => {
      if (
        val.ext === ".jpg" ||
        val.ext === ".webp " ||
        val.ext === ".png" ||
        val.ext === ".mtl" ||
        val.ext === ".mp4" ||
        val.ext === ".webm"
      ) {
        return (
          <ObjButton
            key={i}
            style={{ width: "100%" }}
            onClick={() => {
              this.handleTexture(i);
            }}
          >
            <Img src={val.base} />
            <Text>{val.name}</Text>
          </ObjButton>
        );
      }
    });
    return (
      <Container>
        {Textures.length ? (
          Textures
        ) : (
          <>
            <TextureIcon>{texture}</TextureIcon>
            <Message>
              No texture's available. Add them from General > Assets > Images.
            </Message>
          </>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  overflow: auto;
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

const TextureIcon = styled.div`
  text-align: center;
  margin-top: 32px;
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
