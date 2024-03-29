import React ,{Component} from 'react';
import styled from 'styled-components';
import GeneralSettings from './index'
export default class SceneGeneral extends Component{
    render(){
        return(
            <SceneGraphContainer>
                <SceneGraphTitle>
                    Settings
                </SceneGraphTitle>
                <GeneralSettings/>
            </SceneGraphContainer>
        )
    }
} 


const SceneGraphContainer = styled.div`
    position: fixed;
    float:left;
    width: 191px;
    height: calc(100vh - 37px);
    z-index: 90;
    margin-left: 41px;
    margin-top: 37px;
    background: #1b1b1b;
    border-right: 2px solid #2d2d2d;
`

const SceneGraphTitle = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #2d2d2d;
    padding-left: 5px;
    margin-bottom: 5px;
    color: #ececec;
    font-weight: bold;
    font-size: 27px;
`