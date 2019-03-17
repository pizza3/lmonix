import React, { Component } from 'react';
import * as monaco from "monaco-editor"
import styled from 'styled-components'

export default class VrRenderer extends Component{
    state={
        show:false
    }
    componentDidMount(){
        this.setState({
            show:true
        })
        monaco.editor.create(document.getElementById("containerCode"), {
            value: "function hello() {\n\talert('Hello world!');\n}",
            language: "javascript"
        });
    }
    render(){
        return(
            <div>
                <ContainerCode id="containerCode">
                </ContainerCode>
                <webview src={'file://'+this.props.title[0]+'/index.html'} disablewebsecurity='true'
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
`