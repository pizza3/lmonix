import React, { Component } from "react";
import CodeMirror from "react-codemirror";


export default class Index extends Component{
    render(){
        const options = {
            mode: "javascript",
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true
          };
        return(
            <CodeMirror
            value={this.props.value}
            onChange={this.props.onChange}
            options={options}
          />
        )
    }
}