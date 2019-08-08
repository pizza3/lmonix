import React, { Component } from "react";
import { aframeTemplate } from "../Helpers/helpers";
import  jsdom  from "jsdom";
// const JSDOM = new jsdom()
// console.log(JSDOM);

// const virtualConsole = new jsdom.VirtualConsole();
// virtualConsole.sendTo(console);
// virtualConsole.sendTo(console);

export default class VrPreview extends Component {
  componentDidMount() {
    // electron.ipcRenderer.on("updateVRView", () => {
    //   document.getElementById("webview").reload();
    // });
    // // console.log(this.props.objPresent);
    // const doc = aframeTemplate(
    //   this.props.assetStack,
    //   this.props.objPresent,
    //   this.props.animate,
    //   "file://" + this.props.title,
    //   this.props.isCursor,
    //   this.props.isDefaultLights

    // );
    // const dom = new jsdom(doc, {
    //   virtualConsole: virtualConsole,
    //   userAgent: "Node.js",
    //   runScripts: "dangerously",
    //   resources: "usable"
    // });
    // virtualConsole.on("error", (e) => { console.log('error',e);
    // });
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
      "file://" + this.props.title,
      this.props.isCursor,
      this.props.isDefaultLights,
      this.props.code,
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
