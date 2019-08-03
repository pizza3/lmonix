import React, { Component } from "react";
import { aframeTemplate } from "../Helpers/helpers";
// import { jsdom } from "jsdom";
// const virtualConsole = new jsdom.VirtualConsole();
// virtualConsole.sendTo(console);
// virtualConsole.sendTo(console);

export default class VrPreview extends Component {
  componentDidMount() {
    // electron.ipcRenderer.on("updateVRView", () => {
    //   document.getElementById("webview").reload();
    // });
    // console.log(this.props.objPresent);
    const doc = aframeTemplate(
      this.props.assetStack,
      this.props.objPresent,
      this.props.animate,
      "file://" + this.props.title
    );
    // const dom = new JSDOM(doc, {
    //   virtualConsole: virtualConsole,
    //   userAgent: "Node.js",
    //   runScripts: "dangerously",
    //   resources: "usable"
    // });
    // virtualConsole.on("error", () => { });
    // virtualConsole.on("warn", () => {
    // });
    // virtualConsole.on("info", () => {
    // });
  }
  render() {
    const doc = aframeTemplate(
      this.props.assetStack,
      this.props.objPresent,
      this.props.animate,
      "file://" + this.props.title
    );
    return (
      // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe
        srcDoc={doc}
        style={{
          height: "calc(100% - 37px)",
          width: "100%",
          float: "left",
          border: "none"
        }}
      />
    );
  }
}
