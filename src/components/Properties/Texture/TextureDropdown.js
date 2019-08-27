import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "../../../helpers/ThreeLibManager";
import { texture, addCircle } from "../../../assets/icon";
import Tooltip from '../../../designLib/Tooltip'
import message from "antd/lib/message/index";
const fs = window.require("fs");
const electron = window.require("electron");
const videoExt = [".webm", ".mp4"];
const imageExt = [".jpg", ".webp", ".png"];

export default class MenuDropdown extends Component {
  addModel = obj => {
    this.props.addInScene(obj);
  };
  handleAddAsset = () => {
    if (this.props.location !== "untitled*") {
      electron.ipcRenderer.send("open-asset-modal", {
        location: this.props.location,
        filter: ['mp4','webm','jpg','png','webp'],
        properties:["openFile","multiSelections"]
      });
    } else {
      message.warning("Project not saved, save it to add asset's.", 3);
    }
  };
  handleTexture = i => {
    const type = this.props.active.objPrimitive;
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
      if (type !== "sky") texture.rotation = 3.14;
      this.props.changeObjectProp(texture, "map", "material");
      this.props.changeObjectProp(true, "needsUpdate", "material");
      this.props.changeObjectProp(objTexture, "objTexture");
      this.props.checkForTexture();
    }
  };
  render() {
    const { assetStack } = this.props;
    const Textures = assetStack.map((val, i) => {
      if ([...imageExt, ...videoExt].includes(val.ext)) {
        const data = fs.readFileSync(val.path).toString("base64");
        return (
          <ObjButton
            key={i}
            style={{ width: "100%" }}
            onClick={() => {
              this.handleTexture(i);
            }}
          >
            {val.ext === ".mp4" ? (
              <Video autoplay muted>
                <source
                  src={"data:video/mp4;base64," + data}
                  type="video/mp4"
                />
              </Video>
            ) : (
              <Img src={"data:video/webm;base64," + data} />
            )}
            <Text>
              <Span>Name: </Span>
              {val.name}
            </Text>
            <Text>
              <Span>Type: </Span>
              {val.ext}
            </Text>
          </ObjButton>
        );
      }
    });
    return (
      <Container>
        <Title>Textures</Title>
        <Tooltip align='bottom' name='Add Textures'>
          <Add  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={this.handleAddAsset}>
            {addCircle("#4f74f9")}
          </Add>
        </Tooltip>
        {Textures.length ? (
          <TextureContainer id="customScrollbar">{Textures}</TextureContainer>
        ) : (
          <>
            <TextureIcon>{texture}</TextureIcon>
            <Message>
              No texture's available. Add them by clicking "+" button.
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
  background: #1b1b1b;
  border: 2px solid #2d2d2d;
  width: 255px;
  height: 255px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 0px 35px -12px rgba(0, 0, 0, 0.75);
`;

const Span = styled.span`
  font-size: 10px;
  font-weight: 700;
  float: left;
  margin-right: 5px;
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

const TextureContainer = styled.div`
  position: relative;
  overflow: auto;
  float: left;
  height: calc(100% - 34px);
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
