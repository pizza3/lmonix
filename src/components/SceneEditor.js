import React, { Component } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar/index";
import SceneLayer from "./SceneLayer";
import SceneRenderer from "./SceneRenderer";
import PropertiesEditor from "./PropertiesEditor";
import SceneController from "./SceneController";
import SceneGeneral from "./SceneGeneral";
import * as THREE from "../components/ThreeLibManager";
import {
  TrackballControls,
  TransformControls,
  PointerLockControls
} from "../components/ThreeLibManager";

export default class SceneEditor extends Component {
  state = {
    setMode: true
  };
  changeSetMode = setMode => {
    this.setState({
      setMode
    });
  };

  initScene = () => {
    this.width = window.innerWidth - 466;
    this.height = window.innerHeight - 37;
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.GridHelper(30, 30));
    let nearPlane = 1,
      farPlane = 70000,
      fieldOfView = 70,
      aspectRatio = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(10, 5, 10);
    //load the renderer on the scene
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    //appends the scene to the DOM
    this.container = document.getElementById("SceneRenderer");
    this.container.appendChild(this.renderer.domElement);
    //trackball and transform controls initialise
    this.trackballControls = new THREE.TrackballControls(this.camera);
    this.transformControls = new THREE.TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.transformControls.addEventListener(
      "change",
      function() {
        this.renderScene();
      }.bind(this)
    );
    this.transformControls.setMode("translate");
    this.transformControls.addEventListener(
      "mouseDown",
      function() {
        this.trackballControls.enabled = false;
      }.bind(this)
    );
    this.transformControls.addEventListener(
      "mouseUp",
      function() {
        this.trackballControls.enabled = true;
      }.bind(this)
    );
    //render the scene
    this.renderer.render(this.scene, this.camera);
    this.defaultLights();
    if (this.props.objPresent.length > 0) {
      // checks if the props alresdy consists of objects
      this.props.objPresent.map(obj => {
        this.scene.add(obj);
      });
    }
    //sets the scene obj to the root parent "<App/>", making it available thoughout the app.
    this.props.setSceneObject(this.scene, this.transformControls);
  };

  defaultLights(visible=true) {
    //default lights which are present in the aframe scene
    this.ambientLight = new THREE.AmbientLight(0xbbbbbb, 1);
    this.ambientLight.visible=visible
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.directionalLight.position.set(-0.5, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.visible=visible
    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);
  }
  startanimateScene() {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.animateScene);
    }
  }

  animateScene = () => {
    this.trackballControls.update();
    this.renderer.render(this.scene, this.camera);
    this._frameId = window.requestAnimationFrame(this.animateScene.bind(this));
  };

  stopanimateScene() {
    window.cancelAnimationFrame(this._frameId);
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  handleLeave = () => {
    this.trackballControls.enabled = false;
  };

  handleOver = () => {
    this.trackballControls.enabled = true;
  };

  renderSceneOnMount = () => {
    this.initScene();
    this.startanimateScene();
    document.getElementById("grid").addEventListener("click", function() {
      this.stopanimateScene();
    });
  };

  componentWillUnmount() {
    this.stopanimateScene();
  }

  changeObjectProp = (prop,value)=>{
    this.props.objPresent[this.props.activeObj][prop]=value
  }
  render() {
    return (
      <SceneEditorContainer>
        <MenuBar
          changeSetMode={this.changeSetMode}
          setMode={this.state.setMode}
          {...this.props}
        />
        {this.state.setMode ? (
          <SceneLayer {...this.props} />
        ) : (
          <SceneGeneral {...this.props} />
        )}
        <SceneController {...this.props} />
        <SceneRenderer
          renderSceneOnMount={this.renderSceneOnMount}
          handleLeave={this.handleLeave}
          handleOver={this.handleOver}
        />
        <PropertiesEditor {...this.props} changeObjectProp={this.changeObjectProp} />
      </SceneEditorContainer>
    );
  }
}

const SceneEditorContainer = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: calc(100vh - 37px);
  z-index: 90;
  margin-top: 37px;
  overflow: hidden;
`;
