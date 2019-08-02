import React, { Component } from "react";
import styled from "styled-components";
import { getPolyData } from "./api";
import _ from "lodash";
import { message} from 'antd'
const electron = window.require("electron");

export default class Poly extends Component {
  state = {
    value: "car",
    data: [],
    loaded: false
  };
  componentDidMount() {
    getPolyData(this.state.value).then(obj => {
      let data = obj.assets;
      this.setState({
        data,
        loaded: true
      });
    });
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loaded: false
    },()=>{
      getPolyData(this.state.value).then(obj => {
        if (_.isEmpty(obj)) {
          this.setState({
            data: [],
            loaded: true
          });
        } else {
          const data = obj.assets;
          this.setState({
            data,
            loaded: true
          });
        }
      });
    });
  };
  handleAddModel = data => {
    const { title } = this.props;
    if(title!=='untitled*'){
      data.formats.forEach((obj, i) => {
        if ((obj.formatType = "OBJ")) {
          electron.ipcRenderer.send("addModel", {
            title,
            obj,
            name: data.displayName.replace(/\s/g, "")
          });
        }
      });
    }
    else{
      message.warning("Save the project first, to add model's.",7)
    }
  };
  render() {
    const { loaded, data } = this.state;
    const images = data.map((val, i) => {
      return (
        <ImgCont key={i}>
          <Img key={i} src={val.thumbnail.url} />
          <Add
            onClick={() => {
              this.handleAddModel(val);
            }}
          >
            +
          </Add>
        </ImgCont>
      );
    });
    const message = <Message>😕Sorry can't find any object's.</Message>;
    return (
      <Container>
        <InputContainer>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              placeholder="Search for models"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </InputContainer>
        <ImgContainer>
          {loaded ? (
            images.length ? (
              images
            ) : (
              message
            )
          ) : (
            <div className="loader" />
          )}
        </ImgContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  background: #f7f7f7;
  border: 2px solid #dbdbdb;
  width: 340px;
  height: 255px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
  padding: 0px 6px 0px 6px;
  overflow: auto;
`;
const Input = styled.input`
  width: 324px;
  background: #e0e0e0;
  border: 1px solid #d0d0d0;
  height: 31px;
  border-radius: 4px;
  position: fixed;
  font-weight: 700;
  font-size: 16px;
  padding-left: 5px;
`;
const InputContainer = styled.div`
  width: 100%;
  height: 43px;
  position: fixed;
  background: #f7f7f7;
  padding-top: 6px;
`;
const ImgCont = styled.div`
  width: 48%;
  position: relative;
  float: left;
  margin-right: 6px;
  border-radius: 4px;
  margin-bottom: 7px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
`;
const ImgContainer = styled.div`
  margin-top: 46px;
`;

const Add = styled.button`
  position: absolute;
  width: 31px;
  height: 31px;
  left: 4px;
  bottom: 7px;
  background: #2f79ef;
  border: 1px solid #68a2ff;
  color: #fff;
  border-radius: 50%;
  font-size: 22px;
`;

const Message = styled.div`
  text-align: center;
  font-weight: 700;
  top: 73px;
  position: relative;
`;
