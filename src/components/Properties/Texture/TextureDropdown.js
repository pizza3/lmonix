import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../ThreeLibManager";
import { texture } from "../../../assets/icon";
import { message} from 'antd'
const fs = window.require("fs");
const electron =  window.require('electron');

const videoExt = [".webm",".mp4"]
const imageExt = [".jpg",".webp",".png"]
export default class MenuDropdown extends Component {
  addModel = obj => {
    this.props.addInScene(obj);
  };
  handleAddAsset=()=>{
    if(this.props.location!=='untitled*'){
      electron.ipcRenderer.send("open-asset-modal",{location:this.props.location, filter:this.props.filterBy})
    }
    else{
      message.warning("Project not saved, save it to add asset's.",7)
    }
}
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
      if ([...imageExt,...videoExt].includes(val.ext)) {
        return (
          <ObjButton
            key={i}
            style={{ width: "100%" }}
            onClick={() => {
              this.handleTexture(i);
            }}
          >
            {val.ext==='.mp4'?<Video autoplay muted>
            <source src={"data:video/mp4;base64," +val.data} type="video/mp4"/>
            </Video>: <Img src={"data:video/webm;base64," +val.data} />}
            <Text><Span>Name: </Span>{val.name}</Text>
            <Text><Span>Type: </Span>{val.ext}</Text>
          </ObjButton>
        );
      }
    });
    return (
      <Container>
        <Button onClick={this.handleAddAsset}>Add Texture</Button>
        {Textures.length ? (
          <TextureContainer id="customScrollbar">{Textures}</TextureContainer>
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
  position: relative;
  overflow: auto;
  background: #f7f7f7;
  border: 2px solid #dbdbdb;
  width: 255px;
  height: 255px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 0px 35px -12px rgba(0, 0, 0, 0.75);
`;

const Button = styled.button`
    width: 100%;
    height: 26px;
    background: #2F79EF;
    color: #fff;
    position: absolute;
    bottom: 0px;
    border: none;
    font-size: 9px;
    font-weight: 600;
    outline: none;
    transition: 0.3s;
  &:hover {
    background: #1a66e0;
    color: #fff;
  }
`;

const Span = styled.span`
    font-size: 13px;
    font-weight: 700;
    float: left;
    margin-right: 5px;
    
`


const ObjButton = styled.button`
  width: 100%;
  height: 76px;
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
    background: #e4e4e4;
    color: #1a66e0;
  }
`;

const Img = styled.img`
    height: auto;
    width: 62px;
  float: left;
  position: relative;
`;

const Video = styled.video`
  width: auto;
  height: 62px;
  float: left;
  position: relative;

`
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

const TextureContainer = styled.div`
    position: relative;
    overflow: auto;
    height: calc(100% - 26px);

`