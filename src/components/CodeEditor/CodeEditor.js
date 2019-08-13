import React, { Component } from "react";
import VrPreview from "./VrPreview";
import Animate from "../Animate/index";
import { eye, code } from "../../assets/icon";
import Tooltip from "../../designLib/Tooltip";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/mode/javascript/javascript";
import "../../codemirror.css";
import "../../show-hint.css";
import "../../yonce.css";
import styled from "styled-components";
import _ from 'lodash';
export default class VrRenderer extends Component {
  componentDidMount() {
    const { codeTab } = this.props;
    this.editor = null;
    this.typingTimer = null;
    this.doneTypingInterval = 2500;
    if (codeTab === 1 || codeTab === 2) {
      setTimeout(() => {
          this.createEditor()      
      }, 200);
    }
  }
  createEditor = () => {
    import("codemirror").then(CodeMirror => {      
      const editorDom = document.getElementById("monacocontainer");
      const height = editorDom.offsetHeight;
      const width = editorDom.offsetWidth;
      this.editor = CodeMirror.default(editorDom, {
        value: this.props.code,
        mode: { name: "javascript", globalVars: true },
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        theme: "yonce"
      });
      this.editor.setSize(width, height);
      this.editor.on("keyup", (cm, event) => {
        if (
          !cm.state
            .completionActive /*Enables keyboard navigation in autocomplete list*/ &&
          event.keyCode !== 13 &&
          event.code !== "Space"
        ) {
          /*Enter - do not open autocomplete list just after item has been selected in it*/
          CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
        }
        if(!_.isNull(this.typingTimer))
        clearTimeout(this.typingTimer);

        this.typingTimer = setTimeout(()=>{this.props.updateCode(this.editor.getValue())}, this.doneTypingInterval);

      });
      this.editor.on("keydown", (cm, event) => {
        if(!_.isNull(this.typingTimer))
        clearTimeout(this.typingTimer);
      });
    });
  };
  componentDidUpdate(prevProps) {
    const { codeTab } = this.props;
    if (prevProps.codeTab !== codeTab) {
      if (codeTab === 1 || codeTab === 2) {
        this.createEditor();
      }
    }
  }

  showEditor = () => {
    const { codeTab } = this.props;
    if (codeTab === 1) {
      return (
        <>
          <div style={{ float: "left", width: "50%", height: "100%" }}>
            <VrPreview
              title={this.props.title}
              objPresent={this.props.objPresent}
              assetStack={this.props.assetStack}
              isCursor={this.props.isCursor}
              isDefaultLights={this.props.isDefaultLights}
              code={this.props.code}
            />
          </div>
          <EditorDiv id="monacocontainer" width="50%" height="100%" />
        </>
      );
    } else if (codeTab === 2) {
      return (
        <EditorDiv
          id="monacocontainer"
          width="100%"
          height="100%"
        />
      );
    }
    return (
      <VrPreview
        title={this.props.title}
        objPresent={this.props.objPresent}
        assetStack={this.props.assetStack}
        isCursor={this.props.isCursor}
        isDefaultLights={this.props.isDefaultLights}
        code={this.props.code}
      />
    );
  };
  render() {
    const { codeTab } = this.props;
    const editor = this.showEditor();
    return (
      <div>
        <Container>
          <EditorContainer id="container">
            <FileTabs>
              <TabsContainer>
                <Tooltip align="bottom" name="Render">
                  <Tabs
                    background={codeTab === 0 ? "#4f74f9" : "#2d2d2d"}
                    onClick={() => {
                      this.props.handleActiveTab(0);
                    }}
                  >
                    <TabIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {eye(codeTab === 0 ? "#ffffff" : "#6a6a6a")}
                    </TabIcon>
                  </Tabs>
                </Tooltip>
                <Tooltip align="bottom" name="Render | Script">
                  <TabsCenter
                    background={codeTab === 1 ? "#4f74f9" : "#2d2d2d"}
                    onClick={() => {
                      this.props.handleActiveTab(1);
                    }}
                  >
                    <TabCenterIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {eye(codeTab === 1 ? "#ffffff" : "#6a6a6a")}
                    </TabCenterIcon>
                    <TabsCenterSeperator active={codeTab === 1} />
                    <TabCenterIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {code(codeTab === 1 ? "#ffffff" : "#6a6a6a")}
                    </TabCenterIcon>
                  </TabsCenter>
                </Tooltip>
                <Tooltip align="bottom" name="Script">
                  <Tabs
                    background={codeTab === 2 ? "#4f74f9" : "#2d2d2d"}
                    onClick={() => {
                      this.props.handleActiveTab(2);
                    }}
                  >
                    <TabIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {code(codeTab === 2 ? "#ffffff" : "#6a6a6a")}
                    </TabIcon>
                  </Tabs>
                </Tooltip>
              </TabsContainer>
            </FileTabs>
            {editor}
          </EditorContainer>
        </Container>
        <Animate
          updateAnimate={this.props.updateAnimate}
          animate={this.props.animate}
          active={this.props.active}
        />
      </div>
    );
  }
}

const EditorContainer = styled.div`
  height: calc(100vh - 37px);
  width: 100%;
  margin-top: 37px;
  float: left;
  border-right: 2px solid #2d2d2d;
  position: relative;
`;

const FileTabs = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  background: #1b1b1b;
  border-bottom: 2px solid #2d2d2d;
  padding-top: 4px;
  text-align: -webkit-center;
`;

const TabsContainer = styled.div`
  position: relative;
  width: 174px;
  height: 28px;
`;

const Tabs = styled.div`
  height: 26px;
  width: 41px;
  float: left;
  border-radius: 3px;
  background: ${props => props.background};
  text-align: center;
  padding-top: 3px;
`;

const TabsCenter = styled.div`
  height: 26px;
  width: 60px;
  float: left;
  border-radius: 3px;
  background: ${props => props.background};
  text-align: center;
  padding-top: 3px;
  margin: 0px 16px 0px 16px;
  padding-left: 5px;
`;

const TabsCenterSeperator = styled.div`
  position: relative;
  width: 2px;
  height: 20px;
  float: left;
  border-radius: 5px;
  background: ${props => (props.active ? "#708fff" : "#484848")};
  margin: 0px 3px 0px 5px;
`;

const TabCenterIcon = styled.svg`
  width: 20px;
  float: left;
`;

const TabIcon = styled.svg`
  width: 20px;
`;

const Container = styled.div`
  position: relative;
  float: left;
  width: calc(100% - 463px);
  margin-left: 232px;
  height: 100%;
  overflow: hidden;
`;

const EditorDiv = styled.div`
  font-family: unset;
  float: left;
  width: ${props => props.width};
  /* height: ${props => props.height - 35}; */
  height: calc(100% - 35px);
  position: relative;
`;
