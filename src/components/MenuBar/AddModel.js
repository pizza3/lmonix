/* eslint-disable no-case-declarations */
import * as THREE from "../ThreeLibManager";
import textureLoader from "../Helpers/textureLoader";
import videoLoader from "../Helpers/videoLoader";
import modelLoader from "../Helpers/modelLoader";
import _ from "lodash";
import { helvetikerBold } from "../../assets/fonts";
import {updateGeometry} from '../Helpers/helpers'
import Lato from "../../assets/Lato-Regular-16.fnt"
import LatoPng from "../../assets/lato.png"
import {toCamelCase} from '../Helpers/helpers'
// const loader = new THREE.FontLoader();
const createGeometry = require("three-bmfont-text");
const loadFont = require("load-bmfont");

const AddCube = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });

  let obj = new THREE.Object3D();
  obj.name="Box"
  obj["objName"] = "Box";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "box";
  obj["hashColor"] = "#ef2d5e";
  obj.add(new THREE.Mesh(geometry, material));
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};



const AddPointLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  let color = 0xffffff;
  obj["objName"] = "PointLight";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "point";
  obj["hashColor"] = "#ffffff";
  let light = new THREE.PointLight(color, 1, 0.0, 1);
  obj.add(light);
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddSpotLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  let color = 0xffffff;
  obj["objName"] = "SpotLight";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "spot";
  obj["hashColor"] = "#ffffff";
  let light = new THREE.SpotLight(color);
  light.position.set(100, 1000, 100);

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  light.shadow.camera.near = 500;
  light.shadow.camera.far = 4000;
  light.shadow.camera.fov = 30;
  obj.add(light);
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddHemisphereLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  let color = 0xffffff;
  let groundColor = 0xffffff;
  let intensity = 2;
  obj["objName"] = "HemisphereLight";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "hemisphere";
  obj["hashColor"] = "#ffffff";
  obj["hashGroundColor"] = "#ffffff";
  let light = new THREE.HemisphereLight(color, groundColor, intensity);
  obj.add(light);
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddDirectionalLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  let color = 0xffffff;
  let intensity = 0.5;
  obj["objName"] = "DirectionalLight";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "directional";
  obj["hashColor"] = "#ffffff";
  let light = new THREE.DirectionalLight(color, intensity);
  obj.add(light);
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddAmbientLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  let color = 0xffffff;
  let intensity = 0.5;
  obj["objName"] = "AmbientLight";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "ambient";
  obj["hashColor"] = "#ffffff";
  let light = new THREE.AmbientLight(color, intensity);
  obj.add(light);
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddSky = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let geometry = new THREE.SphereBufferGeometry(5000, 64, 32);
  let material = new THREE.MeshBasicMaterial({
    color: 0xceecf0,
    side: THREE.BackSide,
    map: null
  });

  let obj = new THREE.Object3D();
  obj["objName"] = "Sky";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "sky";
  obj["hashColor"] = "#ceecf0";
  obj.add(new THREE.Mesh(geometry, material));
  scene.add(obj);
  obj.scale.set(-1,1,1)
  return obj;
};

const AddModel = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  obj["objName"] = "3DModel";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "3DModel";
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  return obj;
};

const AddCurvedImage = (scene)=>{
    let object = new THREE.Object3D();
    let material = new THREE.MeshBasicMaterial({
      color: 0xceecf0,
      side: THREE.DoubleSide,
      map: null
    });  
    let geometryCylinder = updateGeometry('CylinderBufferGeometry',{},{
      radiusTop:2,
      radiusBottom:2,
      openEnded:true,
      radialSegments:48,
      thetaLength:3*Math.PI/2
    });
    object["objName"] = "CurvedImage";
    object["objType"] = "Mesh";
    object["objPrimitive"] = "curvedimage";
    object["hashColor"] = "#ef2d5e";
    object.add(new THREE.Mesh(geometryCylinder, material));
    scene.add(object);
    return object;
}

const AddText = (scene) => {
  let obj;
  let geometry;
  let textureLoader;
  let material
  loadFont(Lato, function(err, font) {
    // create a geometry of packed bitmap glyphs, 
    // word wrapped to 300px and right-aligned
    geometry = createGeometry({
      width: 300,
      align: 'right',
      font: font
    })
   console.log(geometry);
   
    // change text and other options as desired
    // the options sepcified in constructor will
    // be used as defaults
    // geometry.update('Lorem ipsum\nDolor sit amet.')
    
    // the resulting layout has metrics and bounds
    console.log(geometry.layout.height)
    console.log(geometry.layout.descender)
      
    // the texture atlas containing our glyphs
    // textureLoader = new THREE.TextureLoader();
    // textureLoader.load('fonts/Arial.png', function (texture) {
      // we can use a simple ThreeJS material
      // material = new THREE.MeshBasicMaterial({
        // map: texture,
        // transparent: true,
        // color: 0xaaffff
      // })

      var textureLoader = new THREE.TextureLoader();
      textureLoader.load(LatoPng, function (texture) {
        // we can use a simple ThreeJS material
        material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          color: 0xaaffff
        })
    
      })
   
      // now do something with our mesh!
      // var mesh = new THREE.Mesh(geometry, material)
    // })
  })
  obj = new THREE.Object3D();
  obj.add(new THREE.Mesh(geometry, material));
  obj.rotation.y = Math.PI;

  // Scale text down
  obj.scale.multiplyScalar(-0.005);

  obj["objName"] = "Text";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "text";
  obj["hashColor"] = "#ceecf0";
  scene.add(obj);
  // obj.position.set(pos.x, pos.y, pos.z);
  // obj.rotation._x = rot.x;
  // obj.rotation._y = rot.y;
  // obj.rotation._z = rot.z;
  return obj;
};

export const ApplyTexture = obj => {
  let mapData = null;
  if (obj.objTexture && obj.objTexture.type === "image") {
    mapData = textureLoader(obj.objTexture.path);
  } else if (obj.objTexture && obj.objTexture.type === "video") {
    mapData = videoLoader(obj.objTexture.data);
  }
  return mapData;
};

const AddGroupObj =  (
  obj,
  type,
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { _x: 0, _y: 0, _z: 0 },
  sca = { x: 0, y: 0, z: 0 },
  // numberOfObj/
) => {
  let mapData = ApplyTexture(obj);
  let object = new THREE.Object3D();
  if (!_.isEmpty(obj)) {
    object.position.set(pos.x, pos.y, pos.z);
    object.rotation.set(rot._x, rot._y, rot._z);
    object.scale.set(sca.x, sca.y, sca.z);
  }
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e,
  })
  let geometryParams = {}  
  if(!_.isEmpty(obj)&&!_.isEmpty(obj.children)&&obj.children[0].type==="Mesh"){
    geometryParams=obj.children[0].geometry.parameters
    material = new THREE.MeshPhongMaterial({
      color: obj.hashColor
        ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
        : 0xef2d5e,
      map: mapData,
      opacity: obj ? obj.children[0].material.opacity : 1,
      transparent: obj ? obj.children[0].material.transparent : false
    });
  }
  object.name=toCamelCase(type)
  object.objAnimate = {}
  switch (type) {
    case "box":
      const geometry = updateGeometry('BoxBufferGeometry',{},geometryParams);
      object["objName"] = "Box";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "box";
      object["hashColor"] = obj.hashColor || "#ef2d5e";      
      object.add(new THREE.Mesh(geometry, material));
      scene.add(object);
      object.objTexture = obj.objTexture ? obj.objTexture : {};
      object.visible = obj.visible ? obj.visible : true;
      object.children[0].receiveShadow = obj.children
        ? obj.children[0].receiveShadow
        : false;
      object.children[0].castShadow = obj.children
        ? obj.children[0].castShadow
        : false;
      return object;
    case "sphere":
      let geometrySphere =updateGeometry('SphereBufferGeometry',{},geometryParams);
      object["objName"] = "Sphere";
      object["objType"] = "Mesh";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object["objPrimitive"] = "sphere";
      object.add(new THREE.Mesh(geometrySphere, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "plane":
      let geometryPlane = updateGeometry('PlaneBufferGeometry',{},geometryParams);
      object["objName"] = "Plane";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "plane";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryPlane, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "cylinder":
      let geometryCylinder = updateGeometry('CylinderBufferGeometry',{},geometryParams);
      object["objName"] = "Cylinder";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "cone";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryCylinder, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "cone":
      let geometryCone = updateGeometry('ConeBufferGeometry',{},geometryParams);
      object["objName"] = "Cone";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "cone";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryCone, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "ring":
      let geometryRing = updateGeometry('RingBufferGeometry',{},geometryParams);
      object["objName"] = "Ring";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "ring";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryRing, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "circle":
      let geometryCircle = updateGeometry('CircleBufferGeometry',{},geometryParams);
      object["objName"] = "Circle";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "circle";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryCircle, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
    case "sky":      
      if(mapData) mapData.rotation=0
      let skygeometry = new THREE.SphereBufferGeometry(5000, 64, 32);
      let skymaterial = new THREE.MeshBasicMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xceecf0,
        side: THREE.BackSide,
        map: mapData
      });
      object["objName"] = "Sky";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "sky";
      object["hashColor"] = obj.hashColor || "#ceecf0";
      object.add(new THREE.Mesh(skygeometry, skymaterial));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      object.scale.set(-1,1,1)
      return object;
    case "3DModel":
      object["objName"] = "3DModel";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "3DModel";
      if (obj.objModel) {
        object.objModel = obj.objModel;
        const model =  modelLoader(object, object.objModel);
        object.add(model)
      }
      scene.add(object);
      object.visible = obj.visible;
      object.receiveShadow = obj.receiveShadow;
      return object;
    case "point":
      object["objName"] = "PointLight";
      object["objType"] = "Light";
      object["objPrimitive"] = "point";
      object["hashColor"] = "#ffffff";
      let pointLight = new THREE.PointLight(obj.hashColor, 1, 0.0, 1);
      object.add(pointLight);
      object.visible = obj.visible;
      object.receiveShadow = obj.receiveShadow;
      scene.add(object);
      return object;
    case "spot":
      object["objName"] = "SpotLight";
      object["objType"] = "Light";
      object["objPrimitive"] = "spot";
      object["hashColor"] = "#ffffff";
      let spotlight = new THREE.SpotLight(obj.hashColor);
      spotlight.position.set(100, 1000, 100);
      spotlight.castShadow = true;
      spotlight.shadow.mapSize.width = 1024;
      spotlight.shadow.mapSize.height = 1024;
      spotlight.shadow.camera.near = 500;
      spotlight.shadow.camera.far = 4000;
      spotlight.shadow.camera.fov = 30;
      object.add(spotlight);
      scene.add(object);
      return object;
    case "hemisphere":
      let groundColor = 0xffffff;
      let intensity = 2;
      object["objName"] = "HemisphereLight";
      object["objType"] = "Light";
      object["objPrimitive"] = "hemisphere";
      object["hashColor"] = "#ffffff";
      let hemispherelight = new THREE.HemisphereLight(
        obj.hashColor,
        groundColor,
        intensity
      );
      object.add(hemispherelight);
      scene.add(object);
      return object;
    case "directional":
      let directionalintensity = 0.5;
      object["objName"] = "DirectionalLight";
      object["objType"] = "Light";
      object["objPrimitive"] = "directional";
      object["hashColor"] = "#ffffff";
      let lightdirectional = new THREE.DirectionalLight(
        obj.hashColor,
        directionalintensity
      );
      object.add(lightdirectional);
      scene.add(object);
      return object;
    case "ambient":
      object["objName"] = "AmbientLight";
      object["objType"] = "Light";
      object["objPrimitive"] = "ambient";
      object["hashColor"] = "#ffffff";
      var ambientlight = new THREE.AmbientLight(obj.hashColor);
      object.add(ambientlight);
      scene.add(object);
      return object;
    case "text":
      const testFont = new THREE.Font(helvetikerBold);
      const textgeometry = new THREE.TextBufferGeometry("Hello three.js!", {
        font: testFont,
        size: 90,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });
      object = new THREE.Object3D();
      object.add(new THREE.Mesh(textgeometry, material));
      object["objName"] = "Text";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "text";
      object["hashColor"] = "#ceecf0";
      scene.add(object);
      object.position.set(pos.x, pos.y, pos.z);
      object.rotation._x = rot.x;
      object.rotation._y = rot.y;
      object.rotation._z = rot.z;
      return object;
    case "curvedimage":
      let geometryCurvedimage = updateGeometry('CylinderBufferGeometry',{},geometryParams);
      object["objName"] = "CurvedImage";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "curvedimage";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      material.side=THREE.DoubleSide
      object.add(new THREE.Mesh(geometryCurvedimage, material));
      scene.add(object);
      return object;
    default:
      
  }
};

export {
  AddCube,
  AddPointLight,
  AddSpotLight,
  AddHemisphereLight,
  AddDirectionalLight,
  AddAmbientLight,
  AddSky,
  AddModel,
  AddGroupObj,
  AddText,
  AddCurvedImage
};
