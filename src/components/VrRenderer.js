import React, { Component } from 'react'
import styled from 'styled-components'
import CodeMirror from 'codemirror'
import "codemirror/mode/javascript/javascript.js";
// import "../codemirror.css"
export default class VrRenderer extends Component{
    state={
        show:false
    }
    componentDidMount(){
        this.setState({
            show:true
        })
        let editor = CodeMirror(document.getElementById('containerCode'), {
            mode:  "javascript",
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true,
            value: `function myScript(){
                return 100;
            }\n`,
            // theme:"base16-dark",
         });

        // setTimeout(function() {
        //     editor.refresh();
        // },10000);
    }
    render(){        
        return(
            <div>
                <div id="containerCode" style={{height:"calc(100vh - 37px)",width:"50%",marginTop:"37px",float:"left"}}>
                </div>
                <webview src={'file://'+this.props.title+'/index.html'} disablewebsecurity='true'
                    style={{
                        height:'calc(100vh - 37px)',
                        width:'50%',
                        marginTop:'37px',
                        float:'left',
                        border:'none',
                    }}>
                </webview>
            </div>
        )
    }
}

const ContainerCode = styled.textarea`
    height:calc(100vh - 37px);
    width:50%;
    margin-top:37px;
    float:left;
`