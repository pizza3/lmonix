import React, { Component } from "react";
import styled from "styled-components";
import { getPolyData } from "./api";
import _ from "lodash";
import message from "antd/lib/message/index";
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
    this.setState(
      {
        loaded: false
      },
      () => {
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
      }
    );
  };
  render() {
    const {applyPolyTexture} = this.props
    const { loaded, data } = this.state;
    const images = data.map((val, i) => {
      return (
        <ImgCont key={i} onClick={()=>{applyPolyTexture(val)}}>
          <Img key={i} src={val.thumbnail.url} />
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
  position: relative;
  width: 250px;
  height: 217px;
  z-index: 1;
  box-shadow: 0px 0px 24px -3px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;
const Input = styled.input`
  width: 240px;
  background: #313131;
  border: 1px solid #5d5d5d;
  color: #ececec;
  height: 31px;
  border-radius: 4px;
  position: fixed;
  font-weight: 700;
  font-size: 16px;
  padding-left: 5px;
  margin-left: 5px;
  &:focus {
    outline: none !important;
    border: 1px solid #4f74f9;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  height: 43px;
  position: relative;
  padding-top: 6px;
`;
const ImgCont = styled.div`
  width: 47%;
  position: relative;
  float: left;
  margin-bottom: 1px;
  overflow: hidden;
  margin-left: 2%;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 4px;
`;
const ImgContainer = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
  overflow: auto;
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
  top: 66px;
  position: relative;
  color: #fff;
  font-size: 10px;
`;
