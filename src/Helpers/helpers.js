import * as THREE from "./ThreeLibManager";
import _ from "lodash";
const fs = window.require("fs");
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
  console.log(obj);
  
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

const videoAndImagesExt = [".png",".jpg",".jpeg"]

export const createAssets = (arr = []) => {
  let assetString = "";
  arr.forEach(val => {
    let name = val.name.replace(/[\W_]+/g, "");
    if (videoAndImagesExt.includes(val.ext)) {
      const data =
      "data:video/webm;base64," +
      fs.readFileSync(val.path).toString("base64");
      assetString += `<img id="${name}" 
      src="${data}"
      > \n`;
    } else if (val.ext === ".obj" ) {
      const data =
      "data:video/webm;base64," +
      fs.readFileSync(val.path).toString("base64");
      assetString += `<a-asset-item id="${name}" src="${
        data
      }"></a-asset-item> \n`;
    }else if(val.ext === ".mtl"){
      const data = fs.readFileSync(val.path);
      assetString += `<a-asset-item id="${name}" src="${
        data
      }"></a-asset-item> \n`;
    } 
    else if(val.ext === ".gltf"){
      assetString += `<a-asset-item id="${name}" src="${
        `http://localhost:9889/Assets/${val.name}/${val.gltfPath}`
      }"></a-asset-item> \n`;
    } 
    else {
      const data =
      "data:video/webm;base64," +
      fs.readFileSync(val.path).toString("base64");
      assetString += `<video id="${name}" autoplay loop="true" src="${data}"></video> \n`;
    }
  });
  return assetString;
};

export const createScene = (threeData = []) => {
  let dataString = "";
  _.forEach(threeData, (mesh) => {
    const {objName, position, rotation, scale, visible, name, hashColor, objTexture, objPrimitive} = mesh
    const id = name.length?name:objName
    const color = hashColor
    const texture = objTexture ? "#" + objTexture.name : ""
    if (mesh.objPrimitive === "sky") {
      dataString += `<a-sky id="${id}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      color="${color}" src="${texture}" position="${mesh.position.x} ${mesh.position.y} ${
        mesh.position.z
      }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"
        visible="${mesh.visible}" 
        material="
        opacity:${mesh.children[0].material.opacity};
        transparent:${mesh.children[0].material.transparent};
        "
        >
        ${createScene(mesh.children.slice(1))}
        </a-sky> \n`;
    } else if (mesh.objPrimitive === "curvedimage") {
      const params = mesh.children[0].geometry.parameters;
      dataString += `<a-curvedimage id="${id}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      color="${
        color
      }" src="${texture}" position="${
        mesh.position.x
      } ${mesh.position.y} ${mesh.position.z}" rotation="${mesh.rotation._x *
        (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
        (180 / 3.14)}"
        visible="${mesh.visible}" 
        material="
        opacity:${mesh.children[0].material.opacity};
        transparent:${mesh.children[0].material.transparent};
        "
        height="${params.height}" radius="${
        params.radiusTop
      }" theta-length="${(params.thetaLength * 180) / Math.PI}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-curvedimage> \n`;
    } else if (mesh.objPrimitive === "3DModel") {
      dataString+= assignModelAttr(mesh)  

    } else if (mesh.objType === "Light") {
      dataString += `<a-entity id="${id}" light="type: ${
        mesh.objPrimitive
      }; color: ${color}; ${generateLigtProps(mesh.children[0])}" position="${mesh.position.x} ${mesh.position.y} ${
        mesh.position.z
      }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"          
        visible="${mesh.visible}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-entity>`;
    } else {
      const geometryParams = setGeometryAframe(
        mesh.children[0].geometry.parameters
      );
      dataString += `<a-entity id="${id}" 
      geometry="primitive: ${mesh.objPrimitive};${geometryParams}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      material="color: ${color}; 
      ${mesh.objTexture ? "src:#" + mesh.objTexture.name : ""};
      transparent:${mesh.children[0].material.transparent};
      opacity:${mesh.children[0].material.opacity};
        " 
      position="${mesh.position.x} ${mesh.position.y} ${mesh.position.z}" scale="${
        mesh.scale.x
      } ${mesh.scale.y} ${mesh.scale.z}" rotation="${mesh.rotation._x *
        (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
        (180 / 3.14)}" 
        shadow="receive:${mesh.children[0].receiveShadow};cast:${
        mesh.children[0].castShadow
      }" 
        visible="${mesh.visible}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-entity> \n`;
    }
  });
  return dataString;
};

const generateLigtProps = (object)=>{
  let data = ""
  const props = ['intensity','angle','distance','decay', 'penumbra', 'castShadow']
  _.forEach(props, (val)=>{
    if(object[val]){
      let objValue = object[val]
      if(val==='angle'){
        objValue = object[val] * (180 / 3.14)
      }
      data += `${val}: ${objValue};`
    }
  })
  return data

}

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
  isCursor = false,
  isDefaultLights = true,
  script = ""
) => {
  // a new template is only been made on when assets are added, a new project got created, project got saved.
  return `<html><head><meta content="text/html;charset=utf-8" http-equiv="Content-Type"><meta content="utf-8" http-equiv="encoding">
  <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-animation-component@5.1.2/dist/aframe-animation-component.min.js"></script> 
  </head><body><a-scene vr-mode-ui="enabled: false" light="defaultLightsEnabled: false"><a-camera>${
    isCursor ? `<a-cursor></a-cursor>` : ``
  }</a-camera>
  <a-assets>${createAssets(assetArr)}</a-assets>
  ${isDefaultLights?
    `<a-entity light="type: ambient; color: #BBB" shadow="cast:true" ></a-entity>
    <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1" shadow="cast:true"></a-entity>`
  :""}
  ${createScene(sceneArr)}</a-scene>

  </body></html>
  `;
};

const assignModelAttr = (mesh)=>{
  console.log(mesh);
  
  const {objName, name, objModel} = mesh
  const id = name.length?name:objName
  console.log('objModel',objModel);
  
  if(objModel.ext===".obj"){
    return `<a-entity id="${id}"
    obj-model="obj: url(${mesh.objModel.path}); "
    position="${mesh.position.x} ${mesh.position.y} ${
      mesh.position.z
    }" scale="${mesh.scale.x} ${mesh.scale.y} ${mesh.scale.z}" rotation="${mesh
      .rotation._x *
      (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
      (180 / 3.14)}"
      shadow="receive:${mesh.receiveShadow};cast:${mesh.castShadow}" 
      visible="${mesh.visible}" 
      >
      ${createScene(mesh.children.slice(1))}
      </a-entity> \n`
  }
  else if(objModel.ext===".gltf"){
    return `<a-gltf-model id="${id}"
    ${createAnimaionAttr(mesh.objAnimate, id)}
    src="${mesh.objModel.path+"/"+mesh.objModel.path.name}"
    position="${mesh.position.x} ${mesh.position.y} ${
      mesh.position.z
    }" scale="${mesh.scale.x} ${mesh.scale.y} ${mesh.scale.z}" rotation="${mesh
      .rotation._x *
      (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
      (180 / 3.14)}"
      visible="${mesh.visible}" 
      >
      ${createScene(mesh.children.slice(1))}
      </a-gltf-model> \n`
  }
  else if(objModel.ext==="poly"){
    return `<a-gltf-model id="${id}"
    ${createAnimaionAttr(mesh.objAnimate, id)}
    src="${mesh.objModel.path}"
    position="${mesh.position.x} ${mesh.position.y} ${
      mesh.position.z
    }" scale="${mesh.scale.x} ${mesh.scale.y} ${mesh.scale.z}" rotation="${mesh
      .rotation._x *
      (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
      (180 / 3.14)}"
      visible="${mesh.visible}" 
      >
      ${createScene(mesh.children.slice(1))}
      </a-gltf-model> \n`
  }
}
export const genericProperties = {
  transform: ["position", "rotation", "scale"],
  material: ["color", "opacity", "visible"],
  light:['intensity']
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
  rotation: {
    name: "",
    property: "rotation",
    from: { x: 0, y: 0, z: 0 },
    to: { x: 0, y: 6.3, z: 0 },
    delay: 0,
    duration: 1200,
    direction: "normal",
    easing: "linear",
    loop: true,
    loopValue: 0,
    elasticity:0
  },
  scale: {
    name: "",
    property: "scale",
    from: { x: 1, y: 1, z: 1 },
    to: { x: 1.2, y: 1.2, z: 1.2 },
    delay: 0,
    duration: 1200,
    direction: "reverse",
    easing: "linear",
    loop: true,
    loopValue: 0,
    elasticity:0
  },
  position: {
    name: "",
    property: "position",
    from: { x: 0, y: 0, z: 0 },
    to: { x: 0, y: 4, z: 0 },
    delay: 0,
    duration: 1200,
    direction: "reverse",
    easing: "linear",
    loop: true,
    loopValue: 0,
    elasticity:0
  },
  color: {
    name: "",
    property: "color",
    from: "#E21F29",
    to: "#ffffff",
    delay: 0,
    duration: 1200,
    direction: "reverse",
    easing: "linear",
    loop: true,
    loopValue: 0,
    elasticity:0
  },
  opacity: {
    name: "",
    property: "opacity",
    from: "1",
    to: "0",
    delay: 0,
    duration: 1200,
    direction: "alternate",
    easing: "linear",
    loop: true,
    loopValue: 0,
    elasticity:0
  }
};

export const createAnimaionAttr = (animData, name) => {
  let data = "";
  const propertPrefix = {
    position:"",
    scale:"",
    rotation:"",
    opacity:"components.material.material.",
    color:"components.material.material.",
  }
  if (animData.length) {
    _.forEach(animData, (anim, index) => {
      let from = anim.from, to=anim.to;
      if (anim.property === "rotation") {
        from = `${anim.from.x * (180 / 3.14)} ${anim.from.y *
          (180 / 3.14)} ${anim.from.z * (180 / 3.14)}`;
        to = `${anim.to.x * (180 / 3.14)} ${anim.to.y * (180 / 3.14)} ${anim.to
          .z *
          (180 / 3.14)}`;
      } else if (anim.property === "position" || anim.property === "scale") {
        from = `${anim.from.x} ${anim.from.y} ${anim.from.z}`;
        to = `${anim.to.x} ${anim.to.y} ${anim.to.z}`;
      }
      data += ` 
      animation__${anim.name}="property: ${propertPrefix[anim.property]}${
        anim.property
      }; type:${anim.property}; from: ${from}; to: ${to}; loop: ${anim.loop};delay:${
        anim.delay
      }; dur: ${anim.duration}; dir:${anim.direction}; easing: ${
        anim.easing
      }; elasticity: ${
        anim.elasticity
      };"`;
    });
    return data;
  }
  return "";
};

export const isAlphaNumeric = (str) => {  
  return str.match(/^[A-ZÀ-Ýa-zà-ý0-9_]+$/i) !== null;
}
