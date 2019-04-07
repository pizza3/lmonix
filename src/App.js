import React, { Component } from 'react';
import TitleBar from './components/TitleBar/TitleBar';
import VrRenderer from './components/VrRenderer';
import SceneEditor from './components/SceneEditor';
// import Code from './components/Code';
import {AddCubeGroup, AddGroupObj}  from './components/MenuBar/AddModel';
import { BrowserRouter as Router, Route } from 'react-router-dom'
const electron =  window.require('electron');

class App extends Component {
   
    state = {
        location:null,
        scene:null,
        title:'untitled*',
        transformControls:null,
        activeObj:null,
        objPresent:[],
        assetStack:[],
        code:''
    }
    componentDidMount(){
        electron.ipcRenderer.on('ipcRenderer', function (e, val) {
            switch (val['option']) {
                case 'extractThreeData':
                    electron.ipcRenderer.send("reciveThreeData",{data:this.state.objPresent, state:this.state});
                    break;
                case 'updateProject':
                    let data = [];
                    val['obj']['data'].forEach((val) => {
                        let a = AddGroupObj(val,val.objPrimitive,this.state.scene,val.position,val.rotation,val.scale);
                        data.push(a)
                    })                    
                    this.setState({
                        objPresent:data,
                        activeObj:0,
                        title:val['title'][0]
                    },()=>{
                        this.state.transformControls.attach(this.state.objPresent[this.state.activeObj]);
                        this.state.scene.add(this.state.transformControls);
                    })
                    break;
                case 'changeTitle':
                    this.setState({
                        title:val['title'][0]
                    })
                    break;
                case 'addGroupObj':
                    let datas = this.state.objPresent;
                    let a = AddCubeGroup(this.state.objPresent[this.state.activeObj]);
                    datas.push(a);
                    this.setState({
                        objPresent:datas,
                        activeObj:datas.length-1,
                    })
                    break;
                case 'setAssetStack':
                    this.setState({
                        assetStack:val['assets'],
                        code:val['code']
                    })
                    break;
                default:
                    console.log('default');
                    break;
            }
        }.bind(this))
    }
    setSceneObject = (scene,transformControls) => {
        this.setState({scene,transformControls})    
    }
    updateCode=(val)=>{
        this.setState({
            code:val
        })
    }
    addInScene = (obj) => {
        let l = this.state.objPresent.length;
        let objPresent = this.state.objPresent;
        objPresent.push(obj);
        this.setState({
            activeObj:l,
            objPresent
        },()=>{
            this.state.transformControls.attach(this.state.objPresent[this.state.activeObj]);
            this.state.scene.add(this.state.transformControls);
        })
    }

    addInSceneOpen = (obj) => {
        let l = this.state.objPresent.length;
        let objPresent = this.state.objPresent;
        objPresent.push(obj);
        this.setState({
            activeObj:l,
            objPresent
        },()=>{
            this.state.transformControls.attach(this.state.objPresent[this.state.activeObj]);
            this.state.scene.add(this.state.transformControls);
        })
    }

    setActiveObj = (activeObj) => {
        this.setState({
            activeObj
        },()=>{
            this.state.transformControls.attach(this.state.objPresent[this.state.activeObj]);
            this.state.scene.add(this.state.transformControls);
            document.getElementById('obj'+this.state.activeObj).addEventListener("contextmenu", function(e) {
                electron.ipcRenderer.send("show-context-menu",{dataNo:this.state.activeObj});
            }.bind(this));
        });
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <TitleBar title ={this.state.title}/>
                    <Route exact path="/" render={()=> <SceneEditor {...this.state} setSceneObject={this.setSceneObject} addInScene={this.addInScene} setActiveObj={this.setActiveObj} />}/>
                    <Route  path="/code" render={()=> <VrRenderer {...this.state} updateCode={this.updateCode} />} />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
