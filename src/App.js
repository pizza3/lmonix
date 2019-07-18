import React, { Component } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import VrRenderer from "./components/CodeEditor";
import SceneEditor from "./components/SceneEditor";
// import Code from './components/Code';
import _ from "lodash";
import { AddGroupObj, ApplyTexture } from "./components/MenuBar/AddModel";
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
    loaded:false,
    active:null,
    activeKey:null,
    activeDrilldown:{},
    addedActiveKey:[],
    activeStack:[],
    copyObj:null,
    editState:[]
  };
  objPresent = [];
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
            let data = this.reloadProject(val["obj"]["data"],0);
            this.objPresent = data;
            this.setState(
              {
                // isDefaultLights: 
                active:data[0],
                objPresent: data,
                activeObj: '00',
                title: val["title"][0]
              },
              () => {
                this.transformControls.attach(
                  this.objPresent[this.state.activeObj]
                );
                this.active=data[0]
                this.scene.add(this.transformControls);
              }
            );
            break;
          case "changeTitle":
            this.setState({
              title: val["title"]
            });
            break;
          case "addGroupObj":
            let a = 
              AddGroupObj(
              {},
              val['obj'],
              this.active,
            );
            this.updateActiveDrilldown(this.active.uuid,true)
            this.active=a
            this.setState({
              active:a,

            })
            this.updateActiveDrilldown()
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
              const { objPresent }=this.state
              const parent = this.active.parent
              this.active.parent.remove(this.active)
              this.setActiveObj(parent) 
              // add case when top layer scene objs removed
              break;
          case "copyObj":
            const keys = _.keys(this.active)
            const keysList = _.filter(keys,(val)=>val.substr(0,3)==="obj")
            // let copy = this.active.clone()
            let copy = this.active
            keysList.forEach((val)=>{
              copy[val]=this.active[val]
            })
            this.setState({
              copyObj:this.active
            })
            break;
          case "pasteObj":
              this.reloadProject3D(this.state.copyObj,this.active)            
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
    this.active=obj
    const {activeStack}=this.state
    this.setState(
      {
        activeObj,
        active:obj,
        objPresent:this.objPresent,
        activeStack:[...activeStack,obj]
      },
      () => {
        this.transformControls.attach(
          this.objPresent[this.state.activeObj]
        );
        this.scene.add(this.transformControls);
      }
    );
  };
  reloadProject = (data,num,parent)=>{
    let objData = [];
    _.forEach(data, val => {
      let object = AddGroupObj(
        val,
        val.objPrimitive,
        !num>0?this.scene:parent,
        val.position,
        val.rotation,
        val.scale
      );
      this.reloadProject(val.children.slice(1),num+1,object)
      if(!num>0){
        objData.push(object);
      }
    });
    return objData
  }
  reloadProject3D = (data,parent)=>{
    let newParent = AddGroupObj(
        data,
        data.objPrimitive,
        parent,
        data.position,
        data.rotation,
        data.scale
      );
      if(data.children.length>=2){
        _.forEach(data.children,(val,i)=>{
          if(i!==0){
            this.reloadProject3D(data.children[i],newParent)
          }
        })
      }
  }
  setActiveObj = (obj) => {
    this.active=obj    
    this.setState(
      {
        active:obj
      },
      () => {
        this.transformControls.attach(obj
        );
        this.scene.add(this.transformControls);
        document.getElementById("obj" + obj.uuid).addEventListener(
          "contextmenu",
          function(e) {
            electron.ipcRenderer.send("show-context-menu", {
              dataNo: this.state.activeKey
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
    this.width = window.innerWidth - 466;
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
    this.ambientLight.intensity = 1;
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.directionalLight.position.set(-0.5, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.visible = visible;
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
    this.setState({
      loaded:true
    })
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

  updateActiveDrilldown=(obj,bool)=>{
    const {activeDrilldown}=this.state
    this.setState({
      activeDrilldown:{
        ...activeDrilldown,
        [obj]:bool
      }
    })
  }

  setMaterial = (material)=>{
    const mapData = ApplyTexture(this.active)
    const newMaterial = new THREE[material]({
      color: this.active.children[0].material.color,
      map: mapData,
      transparent:this.active.children[0].material.transparent,
      opacity:this.active.children[0].material.opacity
    });
    this.active.children[0].material = newMaterial
  }

  changeObjectProp = (value, prop, option) => {    
    switch (option) {
      case "transform":
        this.active[prop[0]][prop[1]] = value;
        break;
      case "children":
        this.active.children[0][prop] = value;
        break;
      case "material":
        this.active.children[0].material[
          prop
        ] = value;
        break;
      case "colorMaterial":
        if(this.active){
          let hex = parseInt(value.replace(/^#/, ""), 16);
          this.active.children[0].material[prop].setHex(
            hex
          );
          this.active.hashColor = value;
        }
        break;
      case "colorLight":
        let lighthex = parseInt(value.replace(/^#/, ""), 16);
        this.active.children[0][prop].setHex(
          lighthex
        );
        this.active.hashColor = value;
      default:
        this.active[prop] = value;
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
                updateActiveDrilldown={this.updateActiveDrilldown}
                setMaterial={this.setMaterial}
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
