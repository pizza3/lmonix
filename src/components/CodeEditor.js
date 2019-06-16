import React, { Component } from "react";
import styled from "styled-components";
import CodeMirror from "react-codemirror";
import VrPreview from "./CodeEditor/VrPreview";
import JsMirror from "./CodeEditor/JsMirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlembedded/htmlembedded"
const electron = window.require("electron");

// import "../codemirror.css"
export default class VrRenderer extends Component {
  state = {
    showJs: true,
    check:false
  };
  componentDidMount(){
    electron.ipcRenderer.on(
      "updateVRView",()=>{
        this.setState((state,prop)=>{
          return {
            check:true
          }
        })
      })
  }
  componentDidUpdate(prevProps,prevState){
    const {check}=this.state
    if(check && check!==prevState.check){
      setTimeout(()=>{
        this.setState({
          check:false
        })
      },10)
    }
  }
  handleActiveTab = (val) => {
    this.setState((state, props) => {
      return {
        showJs:val
      };
    });
  };
  render() {
    const {updateCount, check}=this.state
    const optionshtml = {
      mode: "text/html",
      indentUnit: 4,
      lineNumbers: true,
      matchBrackets: true
    };
    return (
      <div>
        <ContainerCode id="containerCode">
          <FileTabs>
            <Tabs onClick={()=>{this.handleActiveTab(false)}}>index.html</Tabs>
            <Tabs onClick={()=>{this.handleActiveTab(true)}}>script.js</Tabs>
          </FileTabs>
          {this.state.showJs ? (
            <JsMirror
              value={this.props.code}
              onChange={this.props.updateCode}
            />
          ) : (
            <CodeMirror value={this.props.htmlCode} options={optionshtml} />
          )}
        </ContainerCode>
        {!check?
        <VrPreview title={this.props.title} />        
        :
        null}
      </div>
    );
  }
}

const ContainerCode = styled.div`
  height: calc(100vh - 37px);
  width: 50%;
  margin-top: 37px;
  float: left;
  border-right: 2px solid #e0e0e0;
`;

const FileTabs = styled.div`
  width: 100%;
  border-bottom: 2px solid #e0e0e0;
  height: 30px;
  background: #f7f7f7;
`;

const Tabs = styled.div`
  height: 100%;
  border-right: 2px solid #e0e0e0;
  float: left;
  font-size: 11px;
  color: #797979;
  padding: 7px 8px 0px 8px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;
