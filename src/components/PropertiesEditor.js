import React ,{Component} from 'react';
import styled from 'styled-components';
import Texture from './Properties/Texture/Texture'
import ColorPicker from './Properties/ColorPicker'
import Visible from './Properties/Visible'
import Transform from './Properties/Transform'
import CastShadow from './Properties/CastShadow'
import ReceiveShadow from './Properties/ReceiveShadow'
import Model from './Properties/Model'
import Intensity from './Properties/Intensity'
export default class PropertiesEditor extends Component{
    state={
    }

    checkColor = () => {
        if(this.props.objPresent.length>0){
            if(this.props.objPresent[this.props.activeObj].objPrimitive==="3DModel"){
                return false
            }
            return true
        }
        return false
    }

    checkModel = () => {
        if(this.props.objPresent.length>0){
            if(this.props.objPresent[this.props.activeObj].objPrimitive==="3DModel"){
                return true
            }
            return false
        }
        return false
    }
    checkLight = ()=>{
        if(this.props.objPresent.length>0){
            if(this.props.objPresent[this.props.activeObj].objType==="Light"){
                return true
            }
            return false
        }
        return false
    }
    render(){
        const isColor = this.checkColor()
        const isModel = this.checkModel()
        const isLight = this.checkLight()
        return(
            <PropertiesEditorContainer>
                <PropertiesEditorTitle>
                    Properties
                </PropertiesEditorTitle>
                <Transform {...this.props}/>
                {!isLight?
                <Texture {...this.props}/>:null
                }
                {isColor?
                <ColorPicker {...this.props}/>:null
                }
                {isModel && !isLight?
                <Model {...this.props}/>:null
                }
                {isLight?
                <Intensity {...this.props}/>:null
                }
                <Visible {...this.props}/>
                <CastShadow {...this.props}/>
                {
                !isLight?
                <ReceiveShadow {...this.props}/>:null 
                }
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
