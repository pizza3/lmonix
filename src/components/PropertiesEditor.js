import React ,{Component} from 'react';
import styled from 'styled-components';
import Texture from './Properties/Texture/Texture'
import ColorPicker from './Properties/ColorPicker'
import GroundColor from './Properties/GroundColor'
import Visible from './Properties/Visible'
import Transform from './Properties/Transform'
import CastShadow from './Properties/CastShadow'
import ReceiveShadow from './Properties/ReceiveShadow'
import Model from './Properties/Model'
import Intensity from './Properties/Intensity'
import Opacity from './Properties/Opacity';
import Transparent from './Properties/Transparent';
import Material from './Properties/Material';
export default class PropertiesEditor extends Component{
    checkColor = () => {        
        if(this.props.objPresent.length>0){
            if(this.props.active.objPrimitive==="3DModel"){
                return false
            }
            return true
        }
        return false
    }
    checkModel = () => {
        if(this.props.objPresent.length>0){
            if(this.props.active.objPrimitive==="3DModel"){
                return true
            }
            return false
        }
        return false
    }
    checkLight = ()=>{
        if(this.props.objPresent.length>0){
            if(this.props.active.objType==="Light"){
                return true
            }
            return false
        }
        return false
    }
    checkHemisphere = ()=>{
        if(this.checkLight()&&this.props.active.objPrimitive==="hemisphere"){
            return true
        }
        return false
    }
    render(){
        const isColor = this.checkColor()
        const isModel = this.checkModel()
        const isLight = this.checkLight()
        const isHemisphere = this.checkHemisphere()
        return(
            <PropertiesEditorContainer>
                <PropertiesEditorTitle>
                    Properties
                </PropertiesEditorTitle>
                <Transform {...this.props}/>
                <Section>
                {!isLight?
                <Material  {...this.props}/>:null
                }
                {!isLight?
                <Texture {...this.props}/>:null
                }
                {isColor?
                <ColorPicker {...this.props}/>:null
                } 
                {isHemisphere?
                <GroundColor {...this.props}/>
                :null}
                {isModel && !isLight?
                <Model {...this.props}/>:null
                }
                {isLight?
                <Intensity {...this.props}/>:null
                }
                {this.props.objPresent.length>0&&!isLight&&!isModel?
                <Opacity {...this.props}/>
                :null}
                {this.props.objPresent.length>0&&!isLight&&!isModel?
                <Transparent {...this.props}/>
                :null}
                <Visible {...this.props}/>
                </Section>
                <Section>
                <CastShadow isModel={isModel} {...this.props}/>      
                {
                !isLight?
                <ReceiveShadow isModel={isModel} {...this.props}/>:null 
                }
                </Section>
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

const Section = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 2px solid #DBDBDB;
    margin-bottom: 20px;
    overflow: hidden;
`