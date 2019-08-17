import React, { Component } from "react";
import { aframeTemplate } from "../../helpers/helpers";
// import { webviewTag } from "electron";
import _ from 'lodash'
import CodeMenu from './CodeMenu'
const electron = window.require("electron");
const webview = electron.webviewTag;
export default class VrPreview extends Component {
  state = {
    src: "",
    isLoaded:false,
  };
  componentDidMount() {
    const { code }=this.props
    this.handleCode=null
    document
      .getElementById("webview")
      .addEventListener("did-finish-load", function(params) {
        this.executeJavaScript(code);        
      });
  }

  componentDidUpdate(prevProps) {
    const {code, isCursor, isDefaultLights, objPresent}=this.props
    if(prevProps.code!==code){
      document.getElementById("webview").executeJavaScript(code)
    }
    else if(prevProps.isCursor!==isCursor){
      document.getElementById("webview").executeJavaScript(code)
    }
    else if(prevProps.isDefaultLights!==isDefaultLights){
      document.getElementById("webview").executeJavaScript(code)
    }
    else if(!_.isEqual(prevProps.objPresent,objPresent)){
      document.getElementById("webview").executeJavaScript(code)
    }
  }

  toggleDevTool = (bool)=>{
    if(bool){
      document.getElementById("webview").openDevTools()
    }
    else{
      document.getElementById("webview").closeDevTools()
    }
  }

  render() {
    const doc = aframeTemplate(
      this.props.assetStack,
      this.props.objPresent,
      this.props.isCursor,
      this.props.isDefaultLights,
      this.props.code
    );
    return (
      <>
        <webview
          id="webview"
          style={{
            height: "calc(100% - 72px)",
            width: "100%",
            float: "left",
            border: "none"
          }}
          src={"data:text/html," + doc}
        />
        <CodeMenu toggleDevTool={this.toggleDevTool}/>
      </>
    );
  }
}
