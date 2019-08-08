import React ,{Component} from 'react';
import styled from 'styled-components';
import AssetManager from './AssetsManager/AssetManager';
import GeneralSettings from './GeneralSettings'
export default class SceneGeneral extends Component{
    render(){
        return(
            <SceneGraphContainer>
                <SceneGraphTitle>
                    General
                </SceneGraphTitle>
                <GeneralSettings {...this.props}/>
                <AssetManager {...this.props}/>
            </SceneGraphContainer>
        )
    }
} 


const SceneGraphContainer = styled.div`
    position:relative;
    float:left;
    width: 191px;
    height: calc(100vh - 37px);
    z-index: 90;
    margin-left: 41px;
    margin-top: 37px;
    background: #F7F7F7;
    border-right: 2px solid #DBDBDB;
`

const SceneGraphTitle = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #DBDBDB;
    padding-left: 5px;
    margin-bottom: 5px;
    color: #707070;
    font-weight: bold;
    font-size: 27px;
`