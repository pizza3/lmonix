import React, { Component } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import VrRenderer from "./components/CodeEditor";
import SceneEditor from "./components/SceneEditor";
// import Code from './components/Code';
import _ from "lodash";
import { AddCubeGroup, AddGroupObj } from "./components/MenuBar/AddModel";
import { Route, withRouter } from "react-router-dom";
const electron = window.require("electron");
const ThreeContext = new React.createContext()

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
    activeScript: "js"
  };
  componentDidMount() {
    electron.ipcRenderer.on(
      "ipcRenderer",
      function(e, val) {
        switch (val["option"]) {
          case "extractThreeData":
            electron.ipcRenderer.send("reciveThreeData", {
              data: this.state.objPresent,
              state: this.state
            });
            break;
          case "updateProject":
            let data = [];
            _.forEach(val["obj"]["data"], val => {
              // if(!val.objPrimitive==='3DModel'){
                let a = AddGroupObj(
                  val,
                  val.objPrimitive,
                  this.state.scene,
                  val.position,
                  val.rotation,
                  val.scale
                );
                data.push(a);
              // }
            });
            console.log(val);
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
    let l = this.state.objPresent.length;
    let objPresent = this.state.objPresent;
    objPresent.push(obj);
    this.setState(
      {
        activeObj: l,
        objPresent
      },
      () => {
        this.state.transformControls.attach(
          this.state.objPresent[this.state.activeObj]
        );
        this.state.scene.add(this.state.transformControls);
      }
    );
  };
  addInSceneOpen = obj => {
    let l = this.state.objPresent.length;
    let objPresent = this.state.objPresent;
    objPresent.push(obj);
    this.setState(
      {
        activeObj: l,
        objPresent
      },
      () => {
        this.state.transformControls.attach(
          this.state.objPresent[this.state.activeObj]
        );
        this.state.scene.add(this.state.transformControls);
      }
    );
  };
  setActiveObj = activeObj => {
    this.setState(
      {
        activeObj
      },
      () => {
        this.state.transformControls.attach(
          this.state.objPresent[this.state.activeObj]
        );
        this.state.scene.add(this.state.transformControls);
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
                setSceneObject={this.setSceneObject}
                addInScene={this.addInScene}
                setActiveObj={this.setActiveObj}
                setCursor={this.setCursor}
                setDefaultLights={this.setDefaultLights}
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
