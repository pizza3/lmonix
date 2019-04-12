import React ,{Component} from 'react'
import firebase from './firebase'
import styled from 'styled-components'
const fs =  window.require('fs');


const test =
    `
        <html>

        <head>
            <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
            <meta content="utf-8" http-equiv="encoding">
            <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
        </head>

        <body>
            <a-scene>
                <a-camera>

                </a-camera>
                <a-assets>
                    <img id="puydesancyjpg"
                        src="https://firebasestorage.googleapis.com/v0/b/lmonix.appspot.com/o/proj2%2Fpuydesancy.jpg?alt=media&token=482eef57-7521-40cb-b401-34f16f98566b">

                </a-assets>
                <a-entity geometry="primitive: box;" material="color: #ef2d5e; src: " position="0 0 0"
                    scale="7.106086241440635 0.20601102151651723 5.1063628730869" rotation="0 0 0"></a-entity>
                <a-entity light="type: point; color: #ffffff" position="0 0.8946347689975629 0" rotation="0 0 0"></a-entity>
                <a-sky color="#ceecf0" position="0 0 0" rotation="0 0 0"></a-sky>
                <a-entity geometry="primitive: sphere;" material="color: #ef2d5e; src: " position="0 0 0" scale="1 1 1"
                    rotation="0 0 0"></a-entity>
                <a-entity geometry="primitive: box;" material="color: #ef2d5e; src: "
                    position="0 0.16462442868065974 1.1945925492714204" scale="0.34672878816924907 3.549319498884408 1"
                    rotation="0 0 0"></a-entity>

            </a-scene>
        </body>

        </html>
    `

export default class CloudExport extends Component{
    componentDidMount(){
        const {assetStack} = this.props
        this.data=[]
        console.log(assetStack);
        assetStack.forEach((val,i)=>{
            let imgData = fs.readFileSync(val.path)
            this.data.push(imgData)
       })
    }

    initialzeDeploy = ()=>{
        const {assetStack} = this.props
        // console.log(this.data[0])
        assetStack.forEach((val,i)=>{
            if(!(val.ext==="")){
                console.log('proj2/'+ val.name);
                this.storageRef = firebase.storage().ref('proj4/'+ val.name);
                this.storageRef.put(this.data[i], this.checkForMetaData(val.ext)).then(function(snapshot) {
                    console.log('Uploaded a base64url string!', snapshot);
                }).catch((error)=>{
                    console.warn(error);
                });
            }
        })
        // this.storageRefs = firebase.storage().ref('proj3/index.html');
        // this.storageRefs.put('okok', { contentType: 'text/html'}).then(function(snapshot) {
        //     console.log('Uploaded a base64url string!');
        // }).catch((error)=>{
        //     console.warn(error);
        // });
    }

    checkForMetaData = (option)=>{
        switch(option){
            case '.jpg':
            return {
                contentType: 'image/jpeg',
            }
            case '.html':
            return {
                contentType: 'text/html',
            }
            case '.png':
            return {
                contentType: 'image/png',
            }
            case '.webm':
            return {
                contentType: 'video/webm',
            }
            case '.obj':
            return {
                contentType: 'application/octet-stream',
            }
            case '.mtl':
            return {
                contentType: 'application/octet-stream',
            }
            default:
            return {
                contentType: 'application/octet-stream',
            }            
        }
    }

    render(){
        return(
            <PopContainer>
                <Header>Deploy</Header>
                <StartButton onClick={this.initialzeDeploy}>Start Deployment</StartButton>
            </PopContainer>
        )
    }
}


const PopContainer = styled.div`
    width: 230px;
    position: fixed;
    height: 260px;
    background: #faa;
    background: #f7f7f7;
    border-radius: 4px;
    border: 2px solid #d4d4d4;
    z-index: 100;
    padding: 15px;
`

const Header = styled.div`
    font-weight: 800;
    color: grey;
    font-size: 22px;
    text-align: center;
`

const StartButton = styled.button`
    position: relative;
    width: 130px;
    height: 25px;
    border-radius: 3px;
    background: #2F79EF;
    color: #fff;
    font-weight: 700;
    font-size: 10px;
    border: none;
    margin-top: 21px;
    margin-left: calc(50% - 65px);
    &:hover{
        background: #186AEB;
    }
`