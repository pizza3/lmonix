import React, { Component } from "react";
import styled from "styled-components";
import CodeMirror from "react-codemirror";
import VrPreview from "./CodeEditor/VrPreview";
import JsMirror from "./CodeEditor/JsMirror";
import Animate from "./Animate/index";
import { eye, code } from "../assets/icon";
import Trigger from "rc-trigger";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlembedded/htmlembedded";

export default class VrRenderer extends Component {
  state = {
    tabName: 0
  };
  handleActiveTab = val => {
    this.setState((state, props) => {
      return {
        tabName: val
      };
    });
  };
  showEditor = () => {
    const { tabName } = this.state;
    if (tabName === 1) {
      return (
        <>
          <div style={{ float: "left", width: "50%", height:'100%' }}>
            <VrPreview
              title={this.props.title}
              objPresent={this.props.objPresent}
              assetStack={this.props.assetStack}
              animate={this.props.animate}
              isCursor={this.props.isCursor}
              isDefaultLights={this.props.isDefaultLights}        
              code={this.props.code}
            />
          </div>
          <div style={{ float: "left", width: "50%" }}>
            <JsMirror
              value={this.props.code}
              onChange={this.props.updateCode}
            />
          </div>
        </>
      );
    } else if (tabName === 2) {
      return (
        <JsMirror value={this.props.code} onChange={this.props.updateCode} />
      );
    }
    return (
      <VrPreview
        title={this.props.title}
        objPresent={this.props.objPresent}
        assetStack={this.props.assetStack}
        animate={this.props.animate}
        isCursor={this.props.isCursor}
        isDefaultLights={this.props.isDefaultLights}
        code={this.props.code}
      />
    );
  };
  render() {
    const { tabName } = this.state;
    const editor = this.showEditor()
    return (
      <div>
        <Container>
          <EditorContainer id="container">
            <FileTabs>
              <TabsContainer>
                <Trigger
                  action={["hover"]}
                  popup={
                    <TooltipBody>
                      <TooltipOverlay />
                      <TooltipText>Render</TooltipText>
                    </TooltipBody>
                  }
                  prefixCls="dropdown"
                  popupAlign={{
                    points: ["tc", "bc"],
                    offset: [0, 10]
                  }}
                >
                  <Tabs
                    background={tabName === 0 ? "#2F79EF" : "#cecece"}
                    onClick={() => {
                      this.handleActiveTab(0);
                    }}
                  >
                    <TabIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {eye(tabName === 0 ? "#ffffff" : "#6a6a6a")}
                    </TabIcon>
                  </Tabs>
                </Trigger>
                <Trigger
                  action={["hover"]}
                  popup={
                    <TooltipBody>
                      <TooltipOverlay />
                      <TooltipText>Render | Script</TooltipText>
                    </TooltipBody>
                  }
                  prefixCls="dropdown"
                  popupAlign={{
                    points: ["tc", "bc"],
                    offset: [0, 10]
                  }}
                >
                  <TabsCenter
                    background={tabName === 1 ? "#2F79EF" : "#cecece"}
                    onClick={() => {
                      this.handleActiveTab(1);
                    }}
                  >
                    <TabCenterIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {eye(tabName === 1 ? "#ffffff" : "#6a6a6a")}
                    </TabCenterIcon>
                    <TabsCenterSeperator />
                    <TabCenterIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {code(tabName === 1 ? "#ffffff" : "#6a6a6a")}
                    </TabCenterIcon>
                  </TabsCenter>
                </Trigger>
                <Trigger
                  action={["hover"]}
                  popup={
                    <TooltipBody>
                      <TooltipOverlay />
                      <TooltipText>Script</TooltipText>
                    </TooltipBody>
                  }
                  prefixCls="dropdown"
                  popupAlign={{
                    points: ["tc", "bc"],
                    offset: [0, 10]
                  }}
                >
                  <Tabs
                    background={tabName === 2 ? "#2F79EF" : "#cecece"}
                    onClick={() => {
                      this.handleActiveTab(2);
                    }}
                  >
                    <TabIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {code(tabName === 2 ? "#ffffff" : "#6a6a6a")}
                    </TabIcon>
                  </Tabs>
                </Trigger>
              </TabsContainer>
            </FileTabs>
            {editor}
          </EditorContainer>
        </Container>
        <Animate updateAnimate={this.props.updateAnimate} animate={this.props.animate} active={this.props.active} />
      </div>
    );
  }
}


const EditorContainer = styled.div`
  height: calc(100vh - 37px);
  width: 100%;
  margin-top: 37px;
  float: left;
  border-right: 2px solid #e0e0e0;
`;

const FileTabs = styled.div`
  width: 100%;
  border-bottom: 2px solid #e0e0e0;
  height: 35px;
  background: #f7f7f7;
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
  background: #c7c7c7;
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
  overflow:hidden;
`;

const TooltipBody = styled.div`
  width: auto;
  height: auto;
  padding: 7px;
  box-sizing: content-box;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  font-weight: 600;
  font-size: 10px;
`;

const TooltipOverlay = styled.div`
  background: #000;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  left: 0%;
  top: 0%;
  z-index: -1;
`;

const TooltipText = styled.div`
  z-index: 1;
  color: white;
  position: relative;
`;
