import React, { Component } from "react";
import styled from "styled-components";
import CodeMirror from "react-codemirror";
import VrPreview from "./CodeEditor/VrPreview";
import "codemirror/mode/javascript/javascript.js";
// import "../codemirror.css"
export default class VrRenderer extends Component {
  state = {
    showJs: true
  };
  handleActiveTab = () => {
    this.setState((state, props) => {
      return {
        showJs: !state.showJs
      };
    });
  };
  render() {
    const options = {
      mode: "javascript",
      indentUnit: 4,
      lineNumbers: true,
      matchBrackets: true
    };
    const optionshtml = {
      mode: "html",
      indentUnit: 4,
      lineNumbers: true,
      matchBrackets: true
    };
    console.log(this.props);
    return (
      <div>
        <ContainerCode id="containerCode">
          <FileTabs>
            <Tabs onClick={this.handleActiveTab}>index.html</Tabs>
            <Tabs onClick={this.handleActiveTab}>script.js</Tabs>
          </FileTabs>
          {this.state.showJs ? (
            <CodeMirror
              value={this.props.code}
              onChange={this.props.updateCode}
              options={options}
            />
          ) : (
            <CodeMirror value={this.props.htmlCode} options={optionshtml} />
          )}
        </ContainerCode>
        <VrPreview title={this.props.title} />
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
