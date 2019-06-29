import React, { Component } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import VrRenderer from "./components/CodeEditor";
import SceneEditor from "./components/SceneEditor";
// import Code from './components/Code';
import _ from "lodash";
import { AddCubeGroup, AddGroupObj } from "./components/MenuBar/AddModel";
import { Route, withRouter } from "react-router-dom";
import * as THREE from "./components/ThreeLibManager";
import  TransformControls from "./components/Transform";
const electron = window.require("electron");
const ThreeContext = new React.createContext();

class App extends Component {
  state = {
    location: null,
    scene: null,
    title: "untitled*",
    transformControls: null,
    activeObj: null,
    objPresent: [],
    assetStack: [],
    code: "",
    htmlCode: "",
    isDefaultLights: true,
    isCursor: false,
    localIP: null,
    activeScript: "js",
    mouseOverScene:false,
    currentPos :{},
    traX:0
  };
  objPresent = [];
  currentPos = {}
  componentDidMount() {
    electron.ipcRenderer.on(
      "ipcRenderer",
      function(e, val) {
        switch (val["option"]) {
          case "extractThreeData":
            electron.ipcRenderer.send("reciveThreeData", {
              data: this.state.objPresent,
              state: this.state,
            });
            break;

          case "extractThreeDataSave":
            electron.ipcRenderer.send("extractThreeDataSave", {
              data: this.state.objPresent,
              state: this.state,
              location: this.props.location.pathname
            });
            break;
          case "updateProject":
            let data = [];
            _.forEach(val["obj"]["data"], val => {
              let a = AddGroupObj(
                val,
                val.objPrimitive,
                this.state.scene,
                val.position,
                val.rotation,
                val.scale
              );
              data.push(a);
            });
            this.objPresent = data;
            this.setState(
              {
                objPresent: data,
                activeObj: 0,
                title: val["title"][0]
              },
              () => {
                this.state.transformControls.attach(
                  this.state.objPresent[this.state.activeObj]
                );
                this.state.scene.add(this.state.transformControls);
              }
            );
            break;
          case "changeTitle":
            this.setState({
              title: val["title"]
            });
            break;
          case "addGroupObj":
            let datas = this.state.objPresent;
            let a = AddCubeGroup(this.state.objPresent[this.state.activeObj]);
            datas.push(a);
            this.setState({
              objPresent: datas,
              activeObj: datas.length - 1
            });
            break;
          case "setAssetStack":
            this.setState({
              assetStack: val["assets"]
            });
            break;
          case "updateCode":
            this.setState({
              code: val["code"]
            });
            break;
          case "updateCodeHtml":
            this.setState({
              htmlCode: val["code"]
            });
            break;
          case "updateIP":
            this.setState({
              localIP: val["ip"]
            });
            break;
          default:
            console.log("default");
            break;
        }
      }.bind(this)
    );
  }
  setSceneObject = (scene, transformControls) => {
    this.setState({ scene, transformControls });
  };
  updateCode = val => {
    this.setState({
      code: val
    });
  };
  addInScene = obj => {
    const activeObj = this.state.objPresent.length;
    this.objPresent.push(obj);
    this.setState(
      {
        activeObj,
        objPresent:this.objPresent
      },
      () => {
        this.transformControls.attach(
          this.objPresent[this.state.activeObj]
        );
        this.scene.add(this.transformControls);
      }
    );
  };
  setActiveObj = activeObj => {
    this.setState(
      {
        activeObj
      },
      () => {
        this.transformControls.attach(
          this.objPresent[this.state.activeObj]
        );
        this.scene.add(this.transformControls);
        document.getElementById("obj" + this.state.activeObj).addEventListener(
          "contextmenu",
          function(e) {
            electron.ipcRenderer.send("show-context-menu", {
              dataNo: this.state.activeObj
            });
          }.bind(this)
        );
      }
    );
  };
  setCursor = () => {
    const { isCursor } = this.state;
    this.setState({
      isCursor: !isCursor
    });
  };
  setDefaultLights = () => {
    let { isDefaultLights, scene } = this.state;
    this.setState(
      {
        isDefaultLights: !isDefaultLights
      },
      () => {
        scene.children[1].visible = !isDefaultLights;
        scene.children[2].visible = !isDefaultLights;
      }
    );
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
    //render the scene
    this.renderer.render(this.scene, this.camera);
    this.defaultLights();
    if (this.objPresent.length > 0) {
      // checks if the props alresdy consists of objects
      this.objPresent.map(obj => {
        this.scene.add(obj);
      });
    }
    //sets the scene obj to the root parent "<App/>", making it available thoughout the app.
    this.setSceneObject(this.scene, this.transformControls);
  };

  defaultLights(visible = true) {
    //default lights which are present in the aframe scene
    this.ambientLight = new THREE.AmbientLight(0xbbbbbb, 1);
    this.ambientLight.visible = visible;
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.directionalLight.position.set(-0.5, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.visible = visible;
    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);
    this.setController()
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

  setController = (posChange)=>{
    //trackball and transform controls initialise
    this.trackballControls = new THREE.TrackballControls(this.camera);
    this.transformControls = new THREE.TransformControls(
      this.camera,
      this.renderer.domElement,
      posChange
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
  }

  handleLeave = () => {
    this.setState({
      mouseOverScene:false
    })
    this.trackballControls.enabled = false;
  };

  handleOver = () => {
    this.setState({
      mouseOverScene:true
    })
    this.trackballControls.enabled = true;
  };

  renderSceneOnMount = () => {
    this.initScene();
    this.startanimateScene();
    document.getElementById("grid").addEventListener("click", function() {
      this.stopanimateScene();
    });
  };

  changeObjectProp = (value, prop, option) => {
    switch (option) {
      case "transform":
        this.objPresent[this.state.activeObj][prop[0]][prop[1]] = value;
        break;
      case "children":
        this.objPresent[this.state.activeObj].children[0][prop] = value;
        break;
      case "material":
        this.objPresent[this.state.activeObj].children[0].material[
          prop
        ] = value;
        break;
      case "colorMaterial":
        let hex = parseInt(value.replace(/^#/, ""), 16);
        this.objPresent[this.state.activeObj].children[0].material[prop].setHex(
          hex
        );
        this.objPresent[this.state.activeObj].hashColor = value;
        break;
      case "colorLight":
        let lighthex = parseInt(value.replace(/^#/, ""), 16);
        this.objPresent[this.state.activeObj].children[0][prop].setHex(
          lighthex
        );
        this.objPresent[this.state.activeObj].hashColor = value;
      default:
        this.objPresent[this.state.activeObj][prop] = value;
    }
  };

  render() {
    return (
      <React.Fragment>
        <TitleBar
          title={this.state.title}
          {...this.state}
          activeRoute={this.props.location.pathname}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ThreeContext.Provider value="🎉">
              <SceneEditor
                {...this.state}
                scene={this.scene}
                objPresent={this.objPresent || []}
                setSceneObject={this.setSceneObject}
                addInScene={this.addInScene}
                currentPos={this.currentPos}
                setActiveObj={this.setActiveObj}
                setCursor={this.setCursor}
                setDefaultLights={this.setDefaultLights}
                renderSceneOnMount={this.renderSceneOnMount}
                handleLeave={this.handleLeave}
                handleOver={this.handleOver}
                stopanimateScene={this.stopanimateScene}
                changeObjectProp={this.changeObjectProp}
                setController={this.setController}
                transformControls={this.transformControls}
              />
            </ThreeContext.Provider>
          )}
        />
        <Route
          path="/code"
          render={() => (
            <VrRenderer {...this.state} updateCode={this.updateCode} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
