import React ,{Component} from 'react';
import styled from 'styled-components';
import Texture from './Properties/Texture/Texture'
import ColorPicker from './Properties/ColorPicker'
import Visible from './Properties/Visible'
import Transform from './Properties/Transform'
export default class PropertiesEditor extends Component{
    state={
    }

    render(){
        console.log(this.props.objPresent.length);
        return(
            <PropertiesEditorContainer>
                <PropertiesEditorTitle>
                    Properties
                </PropertiesEditorTitle>
                <Transform {...this.props}/>
                <Texture {...this.props}/>
                <ColorPicker {...this.props}/>
                <Visible {...this.props}/>
            </PropertiesEditorContainer>
        )
    }
}

const PropertiesEditorContainer = styled.div`
    position:relative;
    float:right;
    width: 234px;
    height: 100%;
    z-index: 90;
    background: #F7F7F7;
    border-left: 2px solid #DBDBDB;
`

const PropertiesEditorTitle = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #DBDBDB;
    padding-left: 5px;
    color: #707070;
    font-weight: bold;
    font-size: 27px;
    margin-bottom: 13px;
`
