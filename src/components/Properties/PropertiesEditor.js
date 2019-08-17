import React, { Component } from "react";
import Texture from "./Texture/Texture";
import ColorPicker from "./ColorPicker";
import GroundColor from "./GroundColor";
import Visible from "./Visible";
import Transform from "./Transform";
import CastShadow from "./CastShadow";
import ReceiveShadow from "./ReceiveShadow";
import Model from "./Model";
import Intensity from "./Intensity";
import Opacity from "./Opacity";
import Transparent from "./Transparent";
import Distance from "./Distance"
// import Material from "./Properties/Material";
import CustomGeometry from "./CustomGeometry";
import Geometry from "./Geometry";
import Lights from "./Lights";
import {
  PropertiesEditorContainer,
  PropertiesEditorTitle,
  ScrollBarContainer,
  Section
} from "./styled";
import {
  updateGeometry,
  toCamelCase,
  CustomGeometryConfig
} from "../../helpers/helpers";
import _ from "lodash";
export default class PropertiesEditor extends Component {
  checkColor = () => {
    if (this.props.objPresent.length) {
      if (this.props.active.objPrimitive === "3DModel") {
        return false;
      }
      return true;
    }
    return false;
  };
  checkModel = () => {
    if (this.props.objPresent.length) {
      if (this.props.active.objPrimitive === "3DModel") {
        return true;
      }
      return false;
    }
    return false;
  };
  checkLight = () => {
    if (this.props.objPresent.length) {
      if (this.props.active.objType === "Light") {
        return true;
      }
      return false;
    }
    return false;
  };
  checkHemisphere = () => {
    if (this.checkLight() && this.props.active.objPrimitive === "hemisphere") {
      return true;
    }
    return false;
  };
  checkGeometry = (isModel, isLight, objectsPresent) => {
    const { active } = this.props;
    const isCurved = objectsPresent && active.objPrimitive === "curvedimage";
    if (!isModel && !isLight && objectsPresent && !isCurved) {
      return true;
    }
    return false;
  };
  checkSky = () => {
    const { active, objPresent } = this.props;
    if (objPresent.length > 0) {
      if (active.objPrimitive === "sky") {
        return true;
      }
      return false;
    }
    return false;
  };
  checkSpot = ()=>{
    const { active, objPresent } = this.props;
    if (objPresent.length > 0) {
      if (active.objPrimitive === "spot") {
        return true;
      }
      return false;
    }
    return false;
  };
  checkText = ()=>{
    const { active, objPresent } = this.props;
    if (objPresent.length > 0) {
      if (active.objPrimitive === "text") {
        return true;
      }
      return false;
    }
    return false;
  };
  updateGeometry = (value, prop) => {
    const { replaceGeometry, active } = this.props;
    const geometryType = active.children[0].geometry.type;
    let geometry = updateGeometry(
      geometryType,
      active.children[0].geometry.parameters,
      { [toCamelCase(prop)]: value }
    );
    replaceGeometry(geometry);
  };

  createCustomGeometry = () => {
    const { active, objPresent } = this.props;
    const isModel = this.checkModel();
    const isLight = this.checkLight();
    const isText = this.checkText()
    const objectsPresent = objPresent.length;
    if (objectsPresent&&!isModel && !isLight && !isText) {
      let keys = _.keys(active.children[0].geometry.parameters);
      const filterList = CustomGeometryConfig.filter((val, i) => {
        const title = toCamelCase(val.title);
        const primitive = active.objPrimitive;
        if (
          keys.includes(title) &&
          !(val.exclude && val.exclude.includes(primitive))
        ) {
          return true;
        }
        return false;
      });
      return filterList.map((val,i)=>(      
      <CustomGeometry
        key={i}
        title={val.title}
        type={val.type}
        config={val.config}
        updateGeometry={this.updateGeometry}
        active={active}
      />));
    }
    return [];
  };
  render() {
    const { active, assetStack, objPresent, addInScene, changeObjectProp, replaceGeometry, removeObject3D, location } = this.props;
    const isColor = this.checkColor();
    const isModel = this.checkModel();
    const isLight = this.checkLight();
    const isSpot = this.checkSpot()
    const isHemisphere = this.checkHemisphere();
    const isSky = this.checkSky();
    const isText = this.checkText()
    const objectsPresent = objPresent.length;
    const isGeometry = this.checkGeometry(isModel, isLight, objectsPresent, isText);
    const finalGeometries = this.createCustomGeometry()
    return (
      <PropertiesEditorContainer>
        <PropertiesEditorTitle>Properties</PropertiesEditorTitle>
        <ScrollBarContainer id="customScrollbar">
          <>
            {!isModel &&
            !isLight &&
            objectsPresent &&
            active.objPrimitive !== "curvedimage" &&
            !isSky && !isText ? (
              <Geometry active={active} replaceGeometry={replaceGeometry} />
            ) : (
              []
            )}
            {isLight && objectsPresent ? <Lights active={active} /> : []}
            <Section>
              {objectsPresent?<Transform {...this.props} />:[]}
            </Section>
            {finalGeometries.length?<Section>{finalGeometries}</Section>:[]}
            <Section>
              {/* {!isLight&&!isModel ? <Material {...this.props} /> : null} */}
              {!isLight && !isModel ? <Texture {...this.props} /> : null}
              {isColor ? <ColorPicker {...this.props} /> : null}
              {isHemisphere ? <GroundColor {...this.props} /> : null}
              {isModel && !isLight ? <Model {...this.props} addInScene={addInScene} assetStack={assetStack} location={location} changeObjectProp={changeObjectProp} removeObject3D={removeObject3D} /> : null}
              {isLight ? <Intensity changeObjectProp={changeObjectProp} active={active} /> : null}
              {isSpot? <Distance active={active} />: null}
              {this.props.objPresent.length > 0 && !isLight && !isModel ? (
                <Opacity changeObjectProp={changeObjectProp} active={active} />
              ) : null}
              {this.props.objPresent.length > 0 && !isLight && !isModel ? (
                <Transparent changeObjectProp={changeObjectProp} active={active} />
              ) : null}
              <Visible changeObjectProp={changeObjectProp} active={active} />
            </Section>
            <Section>
              <CastShadow isModel={isModel} {...this.props} />
              {!isLight ? (
                <ReceiveShadow isModel={isModel} {...this.props} />
              ) : null}
            </Section>
          </>
        </ScrollBarContainer>
      </PropertiesEditorContainer>
    );
  }
}
