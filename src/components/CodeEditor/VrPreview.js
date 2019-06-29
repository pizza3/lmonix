import React, { Component } from "react";
const electron = window.require("electron");
export default class VrPreview extends Component {
  componentDidMount() {
    electron.ipcRenderer.on("updateVRView", () => {
      document.getElementById("webview").reload();
    });
  }
  render() {
    return (
      <webview
        id="webview"
        src={"file://" + this.props.title + "/index.html"}
        disablewebsecurity="true"
        style={{
          height: "calc(100vh - 37px)",
          width: "50%",
          marginTop: "37px",
          float: "left",
          border: "none"
        }}
      />
    );
  }
}
