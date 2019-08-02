import * as THREE from "../../components/ThreeLibManager";
import _ from "lodash";
export const updateGeometry = (type, obj, value) => {
  switch (type) {
    case "SphereBufferGeometry":
      return new THREE.SphereBufferGeometry(
        value.radius || obj.radius || 1,
        32,
        32
      );
    case "BoxBufferGeometry":
      return new THREE.BoxBufferGeometry(
        value.width || obj.width || 1,
        value.height || obj.height || 1,
        value.depth || obj.depth || 1,
        20,
        20,
        20
      );
    case "PlaneBufferGeometry":
      return new THREE.PlaneBufferGeometry(
        value.width || obj.width || 1,
        value.height || obj.height || 1,
        32,
        32
      );
    case "CylinderBufferGeometry":
      return new THREE.CylinderBufferGeometry(
        value.radiusTop || obj.radiusTop || 1,
        value.radiusBottom || obj.radiusBottom || 1,
        value.height || obj.height || 1,
        value.radialSegments || obj.radialSegments || 36,
        value.heightSegments || obj.heightSegments || 18,
        value.openEnded || obj.openEnded || false,
        value.thetaStart || obj.thetaStart || 0,
        value.thetaLength || obj.thetaLength || 2 * Math.PI
      );
    case "ConeBufferGeometry":
      return new THREE.ConeBufferGeometry(
        value.radius || obj.radius || 1,
        value.height || obj.height || 1,
        value.radialSegments || obj.radialSegments || 36,
        value.heightSegments || obj.heightSegments || 18,
        value.openEnded || obj.openEnded || false
      );
    case "RingBufferGeometry":
      return new THREE.RingBufferGeometry(
        value.innerRadius || obj.innerRadius || 1.2,
        value.outerRadius || obj.outerRadius || 0.8,
        32,
        10,
        0,
        360
      );
    case "CircleBufferGeometry":
      return new THREE.CircleBufferGeometry(
        value.radius || obj.radius || 1,
        32,
        0,
        360
      );
    default:
  }
};

export const updateLights = (type, obj) => {
  switch (type) {
    case "AmbientLight":
      return new THREE.AmbientLight("#ffffff");
    case "DirectionalLight":
      return new THREE.DirectionalLight(
        obj.color || "#ffffff",
        obj.intensity || 0.5
      );
    case "HemisphereLight":
      return new THREE.HemisphereLight("#ffffff", "#ffffff", 2);
    case "SpotLight":
      return new THREE.SpotLight("#ffffff");
    case "PointLight":
      return new THREE.PointLight("#ffffff", 1, 0.0, 1);
    default:
      return new THREE.AmbientLight("#ffffff");
  }
};
export const geometryExist = (obj, prop) => {
  let keys = _.keys(obj);
  let flag = false;
  _.forEach(keys, val => {
    if (val === toCamelCase(prop.toLowerCase())) {
      flag = true;
    }
  });
  return flag;
};

export const toCamelCase = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const CustomGeometryConfig = [
  { title: "Width", type: "number" },
  { title: "Height", type: "number" },
  { title: "Depth", type: "number" },
  { title: "Radius", type: "number" },
  { title: "Radius Top", type: "number", exclude: ["curvedimage"] },
  { title: "Radius Bottom", type: "number", exclude: ["curvedimage"] },
  { title: "Open Ended", type: "boolean", exclude: ["curvedimage"] },
  { title: "Inner Radius", type: "number" },
  { title: "Outer Radius", type: "number" },
  {
    title: "Theta Length",
    type: "range",
    config: { min: 0, max: 2 * Math.PI, step: Math.PI / 10 },
    exclude: ["cylinder", "sky", "ring", "cone", "sphere", "circle"]
  }
];
// src="data:image/${val.ext.slice(
//   1
// )};base64,${val.data}"

export const createAssets = (arr = [], title) => {
  let assetString = "";
  arr.forEach(val => {
    let name = val.name.replace(/[\W_]+/g, "");
    if (val.ext === ".png" || val.ext === ".jpg" || val.ext === ".jpeg") {
      assetString += `<img id="${name}" 
      src="http://localhost:8000/Assets/${val.name}"
      > \n`;
    } else if (val.ext === ".obj" || val.ext === ".mtl") {
      assetString += `<a-asset-item id="${name}" src="http://localhost:9999/${
        val.name
      }"></a-asset-item> \n`;
    } else {
      assetString += `<video id="${name}" src="${title}/${
        val.name
      }"></video> \n`;
    }
  });
  return assetString;
};

export const createScene = (threeData = [], animate = {}) => {
  let dataString = "";
  _.forEach(threeData, (val, i) => {
    if (val.objPrimitive === "sky") {
      dataString += `<a-sky id="entity${i}" color="${val.hashColor}" src="${
        val.objTexture ? "#" + val.objTexture.name : ""
      }" position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" rotation="${val.rotation._x * (180 / 3.14)} ${val.rotation._y *
        (180 / 3.14)} ${val.rotation._z * (180 / 3.14)}"
        visible="${val.visible}" 
        material="
        opacity:${val.children[0].material.opacity};
        transparent:${val.children[0].material.transparent};
        "
        >
        ${createScene(val.children.slice(1))}
        </a-sky> \n`;
    } else if (val.objPrimitive === "curvedimage") {
      const params = val.children[0].geometry.parameters;
      dataString += `<a-curvedimage id="entity${i}" color="${
        val.hashColor
      }" src="${val.objTexture ? "#" + val.objTexture.name : ""}" position="${
        val.position.x
      } ${val.position.y} ${val.position.z}" rotation="${val.rotation._x *
        (180 / 3.14)} ${val.rotation._y * (180 / 3.14)} ${val.rotation._z *
        (180 / 3.14)}"
        visible="${val.visible}" 
        material="
        opacity:${val.children[0].material.opacity};
        transparent:${val.children[0].material.transparent};
        "
        height="${params.height}" radius="${
        params.radiusTop
      }" theta-length="${(params.thetaLength * 180) / Math.PI}"
        >
        ${createScene(val.children.slice(1))}
        </a-curvedimage> \n`;
    } else if (val.objPrimitive === "3DModel") {
      dataString += `<a-entity id="entity${i}" obj-model="obj: ${
        val.objModel ? "#" + val.objModel.name : ""
      };"  position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" scale="${val.scale.x} ${val.scale.y} ${val.scale.z}" rotation="${val
        .rotation._x *
        (180 / 3.14)} ${val.rotation._y * (180 / 3.14)} ${val.rotation._z *
        (180 / 3.14)}"
        shadow="receive:${val.receiveShadow};cast:${val.castShadow}" 
        visible="${val.visible}" 
        >
        ${createScene(val.children.slice(1))}
        </a-entity> \n`;
    } else if (val.objType === "Light") {
      dataString += `<a-entity id="entity${i}" light="type: ${
        val.objPrimitive
      }; color: ${val.hashColor}; intensity: ${
        val.children[0].intensity
      }" position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" rotation="${val.rotation._x * (180 / 3.14)} ${val.rotation._y *
        (180 / 3.14)} ${val.rotation._z * (180 / 3.14)}"          
        visible="${val.visible}" 
        >
        ${createScene(val.children.slice(1))}
        </a-entity>`;
    } else {
      const geometryParams = setGeometryAframe(
        val.children[0].geometry.parameters
      );
      dataString += `<a-entity id="entity${i}" 
      geometry="primitive: ${val.objPrimitive};${geometryParams}" 
      ${createAnimaionAttr(animate,val.objName)}
      material="color: ${val.hashColor}; 
      ${val.objTexture ? "src:#" + val.objTexture.name : ""};
      transparent:${val.children[0].material.transparent};
      opacity:${val.children[0].material.opacity};
        " 
      position="${val.position.x} ${val.position.y} ${val.position.z}" scale="${
        val.scale.x
      } ${val.scale.y} ${val.scale.z}" rotation="${val.rotation._x *
        (180 / 3.14)} ${val.rotation._y * (180 / 3.14)} ${val.rotation._z *
        (180 / 3.14)}" 
        shadow="receive:${val.children[0].receiveShadow};cast:${
        val.children[0].castShadow
      }" 
        visible="${val.visible}"
        >
        ${createScene(val.children.slice(1))}
        </a-entity> \n`;
    }
  });
  return dataString;
};

// animation="property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 10000;"

const setGeometryAframe = obj => {
  let str = "";
  _.forEach(obj, (val, key) => {
    str += `${key}:${val};`;
  });
  return str;
};

export const aframeTemplate = (
  assetArr,
  sceneArr,
  animate,
  title,
  isCursor,
  isDefaultLights = true
) => {
  // a new template is only been made on when assets are added, a new project got created, project got saved.
  return `<html><head><meta content="text/html;charset=utf-8" http-equiv="Content-Type"><meta content="utf-8" http-equiv="encoding">
  <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-animation-component@5.1.2/dist/aframe-animation-component.min.js"></script>
  </head><body><a-scene light="defaultLightsEnabled: true"><a-camera>${
    isCursor ? `<a-cursor></a-cursor>` : ``
  }</a-camera><a-assets>${createAssets(
    assetArr,
    title
  )}</a-assets>${createScene(sceneArr, animate)}</a-scene>
  </body></html>
  `;
};

export const genericProperties = {
  transform: ["position", "rotation", "scale"],
  material: ["color", "opacity", "visible"]
};

export const directions = ["normal", "alternate", "reverse"];
export const easeFuncsList = [
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "linear",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",
  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeInElastic",
  "easeOutElastic",
  "easeInOutElastic"
];

export const basicAnimationsConfig = {
  name: "Animation1",
  property: "rotation",
  from:{x:0,y:0,z:0},
  to:{x:0,y:6.3,z:0},
  delay: 0,
  duration: 1200,
  direction: "normal",
  ease: "linear",
  loop: true,
  loopValue: 0
};


export const createAnimaionAttr = (animData, name)=>{
  console.log(animData,animData[name]);
  
  if(animData[name]){
    let data=""
    _.forEach(animData[name],(anim,index)=>{
        data=`animation="property: ${anim.property}; from: 0 0 0; to: 0 360 0; loop:  ${anim.loop}; dur:  ${anim.duration};"`
    })
    return data
  }
  return ""
}

export const setObjectDefaultName = (name, numberOfObj)=>{
  if(numberOfObj.name){
    
  }
}