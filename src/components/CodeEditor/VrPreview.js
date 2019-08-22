import React, { Component } from "react";
import { aframeTemplate } from "../../helpers/helpers";
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
