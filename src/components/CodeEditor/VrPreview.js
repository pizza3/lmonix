import React, { Component } from "react";
import {aframeTemplate} from '../Helpers/helpers'

export default class VrPreview extends Component {
  componentDidMount() {
    // electron.ipcRenderer.on("updateVRView", () => {
    //   document.getElementById("webview").reload();
    // });
    console.log(this.props.objPresent);
    
  }
  render() {
    const doc = aframeTemplate(this.props.assetStack,this.props.objPresent,this.props.animate,"file://" + this.props.title)    
    return (
      <iframe 
        srcDoc={doc}
        style={{
          height: 'calc(100% - 37px)',
          width: '100%',
          float: 'left',
          border: 'none',
        }}
      />
      // <webview
      //   id="webview"
      //   src={"file://" + this.props.title + "/index.html"}
      //   disablewebsecurity="true"
      //   style={{
      //     height: "calc(100vh - 37px)",
      //     width: "50%",
      //     marginTop: "37px",
      //     float: "left",
      //     border: "none"
      //   }}
      // />
    );
  }
}
