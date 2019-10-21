import React, { Component } from "react";
import styled from "styled-components";
import { book } from "../../assets/icon";
const electron =  window.require('electron');
const shell = electron.shell;

export default class Docs extends Component {
  handleClick=(event)=>{
    event.preventDefault();
    shell.openExternal('https://github.com/pizza3/lmonix/blob/master/README.md');
  }
  render() {
    return (
      <PopContainer>
        <Header>Docs</Header>
        <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {book()}
        </Logo>
        <Cont>
          <Desc>Need Help? Try out the docs for any queries and issues.</Desc>
        </Cont>
        <StartButton onClick={this.handleClick}>Open Documentation</StartButton>
      </PopContainer>
    );
  }
}

const PopContainer = styled.div`
  width: 248px;
  position: fixed;
  height: 295px;
  border-radius: 4px;
  z-index: 100;
  padding: 15px;
  background: #1b1b1b;
  border: 2px solid #2d2d2d;
`;

const Header = styled.div`
  font-weight: 800;
  color: grey;
  font-size: 22px;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 9px;
  font-weight: 500;
  text-align: -webkit-center;
  color: #a9a9a9;
  margin-top: 31px;
`;

const Logo = styled.svg`
  width: 66px;
  position: absolute;
  margin-left: 75px;
  margin-top: 22px;
`;

const Cont = styled.div`
  position: relative;
  height: 41px;
  padding: 0px 11px 0px 11px;
  margin-top: 113px;
`;

const StartButton = styled.button`
  position: relative;
  width: 130px;
  height: 25px;
  border-radius: 3px;
  background: #4f74f9;
  color: #fff;
  font-weight: 700;
  font-size: 10px;
  border: none;
  margin-top: 33px;
  margin-left: calc(57% - 79px);
`;
