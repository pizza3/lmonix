import React, { Component } from "react";
import { aframeTemplate } from "../../helpers/helpers";
import _ from "lodash";
import CodeMenu from "./CodeMenu";
const electron = window.require("electron");
const webview = electron.webviewTag;
export default class VrPreview extends Component {
  state = {
    src: "",
    isLoaded: false
  };
  toggleDevTool = bool => {
    if (bool) {
      document.getElementById("webview").openDevTools();
    } else {
      document.getElementById("webview").closeDevTools();
    }
  };

  reloadWebview = () => {
    document.getElementById("webview").reload();
  };

  captureWebview = () => {
    const width = document.getElementById("webview").offsetWidth;
    const height = document.getElementById("webview").offsetHeight;
    document
      .getElementById("webview")
      .getWebContents().capturePage(function(image){
      })
    // document.getElementById("webview").getWebContents().printToPDF({}, (error, data) => {
    //   console.log(data, error)
    //   if (error) throw error
    // })
  };
  render() {
    const doc = aframeTemplate(
      this.props.assetStack,
      this.props.objPresent,
      this.props.isCursor,
      this.props.isDefaultLights,
      this.props.code,
      this.props.config
    );
    return (
      <>
        <webview
          id="webview"
          style={{
            height: "calc(100% - 72px)",
            width: "100%",
            float: "left",
            border: "none",
            background:"#1c1c1c"
          }}
          src={"data:text/html," + doc}
        />
        <CodeMenu
          toggleDevTool={this.toggleDevTool}
          reloadWebview={this.reloadWebview}
          captureWebview={this.captureWebview}
        />
      </>
    );
  }
}
