import React, { Component } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import SceneEditor from "./components/SceneEditor/SceneEditor";
import _ from "lodash";
import { AddGroupObj, ApplyTexture } from "./components/MenuBar/AddModel";
import { Route, withRouter } from "react-router-dom";
import { basicAnimationsConfig } from "./Helpers/helpers";
import * as THREE from "./Helpers/ThreeLibManager";
import TransformControls from "./Helpers/Transform";
import TrackballControls from "./Helpers/TrackballControls";
import MenuBar from "./components/MenuBar/index";
import SceneLayer from "./components/SceneGraph/SceneLayer";
import SceneGeneral from "./components/SceneGeneral";

import { message } from "antd";
// import { JSDOM } from "jsdom";
import ThreeProvider from "./context/ThreeProvider";
const electron = window.require("electron");

class App extends Component {
  state = {
    numberOfObj: {},
    location: null,
    scene: null,
    title: "untitled*",
    transformControls: null,
    activeObj: null,
    objPresent: [],
    assetStack: [],
    code: "// Add your javascript over here 🙃",
    htmlCode: "",
    isDefaultLights: true,
    isCursor: false,
    localIP: null,
    activeScript: "js",
    loaded: false,
    active: null,
    activeKey: null,
    activeDrilldown: {},
    addedActiveKey: [],
    activeStack: [],
    copyObj: null,
    editState: [],
    setMode: true,
    codeTab:2
  };
  objPresent = [];
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
    electron.ipcRenderer.on(
      "ipcRenderer",
      function(e, val) {
        switch (val["option"]) {
          case "message":
            message[val["type"]](val["message"], 3);
            break;
          case "extractThreeData":
            electron.ipcRenderer.send("reciveThreeData", {
              // data: this.state.objPresent,
              // state: this.state
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
            let parsedObj = JSON.parse(val["obj"]);
            this.clearScene();
            const data = this.reloadProject(parsedObj["data"], 0);
            this.objPresent = data;
            this.setState(
              {
                // isDefaultLights:
                active: data[0],
                objPresent: data,
                activeObj: "00",
                title: val["title"][0]
              },
              () => {
                this.transformControls.attach(
                  this.objPresent[this.state.activeObj]
                );
                this.active = data[0];
                this.scene.add(this.transformControls);
                message.success("Project Loaded", 3);
              }
            );
            break;
          case "changeTitle":
            this.setState({
              title: val["title"]
            });
            break;
          case "addGroupObj":
            let a = AddGroupObj({}, val["obj"], this.active);
            this.updateActiveDrilldown(this.active.uuid, true);
            this.active = a;
            this.setState({
              active: a
            });
            this.updateActiveDrilldown();
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
          case "deleteObj":
            this.deleteObject();
            // add case when top layer scene objs removed
            break;
          case "copyObj":
            const keys = _.keys(this.active);
            const keysList = _.filter(keys, val => val.substr(0, 3) === "obj");
            // let copy = this.active.clone()
            let copy = this.active;
            keysList.forEach(val => {
              copy[val] = this.active[val];
            });
            this.setState({
              copyObj: this.active
            });
            break;
          case "pasteObj":
            this.paste3DObject(this.state.copyObj, this.active);
            break;
          case "animate":
            this.setAnimate();
            break;
          default:
            // console.log("default");
            break;
        }
      }.bind(this)
    );
  }
  changeSetMode = setMode => {
    this.setState({
      setMode
    });
  };
  handleActiveTab = val => {
    this.setState((state, props) => {
      return {
        codeTab: val
      };
    });
  };
  setAnimate = () => {
    const { active } = this.state;
    let copy = _.clone(basicAnimationsConfig.rotation);
    copy.name = `Animation_${active.objAnimate.length + 1}`;
    this.active.objAnimate = [...active.objAnimate, copy];
    this.setState({
      active: this.active
    });
  };
  updateAnimate = (data, index) => {
    this.active.objAnimate[index] = data;
    this.setState({
      active: this.active
    });
  };
  setSceneObject = (scene, transformControls) => {
    this.setState({ scene, transformControls });
  };
  updateCode = val => {
    this.setState({
      code: val
    });
  };
  handleResize = () => {
    const { objPresent } = this.state;    
    const width = objPresent.length!==0
      ? window.innerWidth - 232
      : window.innerWidth - 466;
    const height = window.innerHeight - 37;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
  addInScene = obj => {    
    const { objPresent, activeStack } = this.state;
    const activeObj = objPresent.length;
    if(objPresent.length===0)
    this.handleResize()
    this.objPresent.push(obj);
    this.active = obj;
    const entityNumber = this.setNumberOfObj(obj);
    obj.objName = `${obj.objName}_${entityNumber}`;
    this.setState(
      {
        activeObj,
        active: obj,
        objPresent: this.objPresent,
        activeStack: [...activeStack, obj]
      },
      () => {
        this.transformControls.attach(this.objPresent[this.state.activeObj]);
        this.scene.add(this.transformControls);
      }
    );
  };
  setNumberOfObj = obj => {
    const { numberOfObj } = this.state;
    if (numberOfObj[obj.objName]) {
      let number = numberOfObj[obj.objName] + 1;
      this.setState({
        numberOfObj: {
          ...numberOfObj,
          [obj.objName]: number
        }
      });
      return number;
    } else {
      this.setState({
        numberOfObj: {
          ...numberOfObj,
          [obj.objName]: 1
        }
      });
      return 1;
    }
  };
  reloadProject = (data, num, parent) => {
    let objData = [];
    this.clearScene();
    _.forEach(data, val => {
      let object = AddGroupObj(
        val,
        val.objPrimitive,
        !num > 0 ? this.scene : parent,
        val.position,
        val.rotation,
        val.scale
      );
      const entityNumber = this.setNumberOfObj(object);
      object.objName = `${object.objName}_${entityNumber}`;
      this.reloadProject(val.children.slice(1), num + 1, object);
      if (!num > 0) {
        objData.push(object);
      }
    });
    return objData;
  };
  paste3DObject = (data, parent, removeData) => {
    let newParent = AddGroupObj(
      data,
      data.objPrimitive,
      parent,
      data.position,
      data.rotation,
      data.scale
    );
    const entityNumber = this.setNumberOfObj(newParent);
    newParent.objName = `${newParent.objName}_${entityNumber}`;
    if (data.children.length >= 2) {
      _.forEach(data.children, (val, i) => {
        if (i !== 0) {
          this.paste3DObject(val, newParent);
        }
      });
    }
    if (removeData) {
      this.deleteObject();
    }
  };
  replaceGeometry = (geometry, type) => {
    this.active.children[0].geometry.dispose();
    this.active.children[0].geometry = geometry;
    if (type) {
      this.active.objName = type;
      this.active.objPrimitive = type.toLowerCase();
      this.setState({
        active: this.active
      });
    }
  };
  replaceLights = (light, type) => {
    this.active["objName"] = `${type}Light`;
    this.active["objType"] = "Light";
    this.active["objPrimitive"] = type.toLowerCase();
    this.active["hashColor"] = "#ffffff";
    const copy = this.active.children.slice(1);
    _.forEach(this.active.children, val => {
      this.active.remove(val);
    });
    this.active.add(light);
    _.forEach(copy, val => {
      this.paste3DObject(val, this.active);
    });
    this.setState({
      active: this.active
    });
  };
  clearScene = () => {
    this.transformControls.detach(this.active);
    _.forEach(this.objPresent, val => {
      this.scene.remove(val);
    });
    this.objPresent = [];
    this.setState({
      objPresent: []
    });
  };
  deleteObject = () => {
    const { objPresent } = this.state;
    const parent = this.active.parent;
    const uuid = this.active.uuid;
    const objPresentInScene = _.find(objPresent, { uuid: uuid });
    if (objPresentInScene) {
      let index = 0;
      let newObjPresent = [];
      _.forEach(objPresent, (obj, i) => {
        if (obj.uuid === uuid) {
          index = i;
        }
      });
      newObjPresent = _.filter(objPresent, obj => obj.uuid !== uuid);
      this.setState(
        {
          objPresent: newObjPresent
        },
        () => {
          this.objPresent = newObjPresent;
          this.transformControls.detach(this.active);
          this.scene.remove(this.active);
          if (!_.isEmpty(newObjPresent)) {
            if (index) {
              this.setActiveObj(this.state.objPresent[index - 1]);
            } else {
              this.setActiveObj(this.state.objPresent[index]);
            }
          }
        }
      );
    } else {
      this.active.parent.remove(this.active);
      this.setActiveObj(parent);
    }
  };
  setActiveObj = obj => {
    this.active = obj;
    this.setState(
      {
        active: obj
      },
      () => {
        this.transformControls.attach(obj);
        this.scene.add(this.transformControls);
        document.getElementById("obj" + obj.uuid).addEventListener(
          "contextmenu",
          function(e) {
            console.log('ipcRenderer')
            electron.ipcRenderer.send("show-context-menu");
          }
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
    const { isDefaultLights, scene } = this.state;
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
    const { isDefaultLights, objPresent } = this.state;
    this.width = objPresent.length
      ? window.innerWidth - 466
      : window.innerWidth - 232;
    this.height = window.innerHeight - 37;
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.GridHelper(30, 30));
    const nearPlane = 1,
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
    // set trackballControls
    this.trackballControls = new THREE.TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    if (isDefaultLights) this.defaultLights();

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
    this.ambientLight.intensity = 1;
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.directionalLight.position.set(-0.5, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.visible = visible;
    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);
    //Set up shadow properties for the light
    this.directionalLight.shadow.mapSize.width = 5012; // default
    this.directionalLight.shadow.mapSize.height = 5012; // default
    this.directionalLight.shadow.camera.near = 0.5; // default
    this.directionalLight.shadow.camera.far = 5000; // default
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

  setController = posChange => {
    //trackball and transform controls initialise

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
    this.setState({
      loaded: true
    });
  };

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

  updateActiveDrilldown = (obj, bool) => {
    const { activeDrilldown } = this.state;
    this.setState({
      activeDrilldown: {
        ...activeDrilldown,
        [obj]: bool
      }
    });
  };

  setMaterial = material => {
    const mapData = ApplyTexture(this.active);
    const newMaterial = new THREE[material]({
      color: this.active.children[0].material.color,
      map: mapData,
      transparent: this.active.children[0].material.transparent,
      opacity: this.active.children[0].material.opacity
    });
    this.active.children[0].material = newMaterial;
  };

  changeObjectProp = (value, prop, option) => {
    switch (option) {
      case "transform":
        this.active[prop[0]][prop[1]] = value;
        break;
      case "children":
        this.active.children[0][prop] = value;
        break;
      case "material":
        this.active.children[0].material[prop] = value;
        break;
      case "colorMaterial":
        if (this.active) {
          let hex = parseInt(value.replace(/^#/, ""), 16);
          this.active.children[0].material[prop].setHex(hex);
          this.active.hashColor = value;
        }
        break;
      case "colorLight":
        let lighthex = parseInt(value.replace(/^#/, ""), 16);
        this.active.children[0][prop].setHex(lighthex);
        this.active.hashColor = value;
        break;
      case "addObject":
        this.active.add(value);
        break;
      default:
        this.active[prop] = value;
        break;
    }
  };
  render() {
    const {
      objPresent,
      active,
      activeDrilldown,
      assetStack,
      isDefaultLights,
      isCursor,
      scene,
      codeTab
    } = this.state;
    return (
      // <ThreeProvider
      //   value={{
      //     objPresent: objPresent || [],
      //     active: active,
      //     setActiveObj: this.setActiveObj,
      //     updateActiveDrilldown: this.updateActiveDrilldown,
      //     activeDrilldown: activeDrilldown,
      //     changeObjectProp: this.changeObjectProp,
      //     assetStack: assetStack,
      //     handleActiveTab:this.handleActiveTab,
      //     codeTab:codeTab
      //   }}
      // >
      <>
        <TitleBar
          title={this.state.title}
          localIP={this.state.localIP}
          activeRoute={this.props.location.pathname}
        />
        <MenuBar
          changeSetMode={this.changeSetMode}
          setMode={this.state.setMode}
          scene={scene}
          addInScene={this.addInScene}
        />
        {this.state.setMode ? (
          <SceneLayer
            objPresent={objPresent}
            paste3DObject={this.paste3DObject}
          />
        ) : (
          <SceneGeneral
            assetStack={assetStack}
            setDefaultLights={this.setDefaultLights}
            setCursor={this.setCursor}
            isDefaultLights={isDefaultLights}
            isCursor={isCursor}
          />
        )}
        <Route
          exact
          path="/"
          render={() => (
            <SceneEditor
              {...this.state}
              scene={this.scene}
              objPresent={this.state.objPresent || []}
              setSceneObject={this.setSceneObject}
              addInScene={this.addInScene}
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
              updateActiveDrilldown={this.updateActiveDrilldown}
              setMaterial={this.setMaterial}
              replaceGeometry={this.replaceGeometry}
              replaceLights={this.replaceLights}
            />
          )}
        />
        <Route
          path="/code"
          render={() => (
            <CodeEditor
              title={this.state.title}
              objPresent={this.state.objPresent}
              assetStack={this.state.assetStack}
              isCursor={this.state.isCursor}
              isDefaultLights={this.state.isDefaultLights}
              code={this.state.code}
              codeTab={this.state.codeTab}
              updateCode={this.updateCode}
              updateAnimate={this.updateAnimate}
              handleActiveTab={this.handleActiveTab}
            />
          )}
        />
      </>
      // </ThreeProvider>
    );
  }
}

export default withRouter(App);
