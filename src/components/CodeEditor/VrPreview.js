import React, { Component } from "react";
const electron = window.require("electron");

export default class VrPreview extends Component {
  state = {
    check: false
  };
  componentDidMount() {
    electron.ipcRenderer.on("updateVRView", () => {
      this.setState((state, prop) => {
        return {
          check: true
        };
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { check } = this.state;
    if (check && check !== prevState.check) {
      setTimeout(() => {
        this.setState({
          check: false
        });
      }, 10);
    }
  }
  render() {
    const {check}=this.state
    return (
      <>
        {!check ? (
          <webview
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
        ) : null}
      </>
    );
  }
}
