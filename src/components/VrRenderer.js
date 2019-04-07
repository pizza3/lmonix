import React, { Component } from 'react'
import styled from 'styled-components'
import CodeMirror from 'react-codemirror'
import "codemirror/mode/javascript/javascript.js";
// import "../codemirror.css"
export default class VrRenderer extends Component{
    state={
        code:`function myScript(){return 100;}\n`
    }
    render(){        
        const options = {
            mode:  "javascript",
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true,
        }
        return(
            <div>
                <ContainerCode id="containerCode">
                    <CodeMirror value={this.props.code} onChange={this.props.updateCode} options={options} />
                </ContainerCode>
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

const ContainerCode = styled.div`
    height:calc(100vh - 37px);
    width:50%;
    margin-top:37px;
    float:left;
    border-right: 2px solid #e0e0e0;
`