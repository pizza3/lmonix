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
        !_.isUndefined(value.openEnded)?value.openEnded:obj.openEnded || false,
        value.thetaStart || obj.thetaStart || 0,
        value.thetaLength || obj.thetaLength || 2 * Math.PI
      );
    case "ConeBufferGeometry":
      return new THREE.ConeBufferGeometry(
        value.radius || obj.radius || 1,
        value.height || obj.height || 1,
        value.radialSegments || obj.radialSegments || 36,
        value.heightSegments || obj.heightSegments || 18,
        !_.isUndefined(value.openEnded)?value.openEnded:obj.openEnded || false,
      );
    case "RingBufferGeometry":
      return new THREE.RingBufferGeometry(
        value.innerRadius || obj.innerRadius || 0.5,
        value.outerRadius || obj.outerRadius || 1,
        32,
        1,
        0,
        Math.PI * 2
      );
    case "CircleBufferGeometry":
      return new THREE.CircleBufferGeometry(
        value.radius || obj.radius || 1,
        32,
        0,
        Math.PI * 2
      );
    default:
  }
};

export const updateLights = (type, obj = {}) => {
  switch (type) {
    case "AmbientLight":
      return new THREE.AmbientLight(obj.color || "#ffffff", obj.intensity || 1);
    case "DirectionalLight":
      return new THREE.DirectionalLight(
        obj.color || "#ffffff",
        obj.intensity || 0.5
      );
    case "HemisphereLight":
      return new THREE.HemisphereLight(
        obj.skyColor || "#ffffff",
        obj.groundColor || "#ffffff",
        obj.intensity || 1
      );
    case "SpotLight":
      return new THREE.SpotLight(
        obj.color || "#ffffff",
        obj.intensity || 1,
        obj.distance || 0,
        obj.angle || Math.PI / 3,
        obj.penumbra || 0,
        obj.decay || 1
      );
    case "PointLight":
      return new THREE.PointLight(
        obj.color || "#ffffff",
        obj.intensity || 1,
        obj.distance || 0,
        obj.decay || 1
      );
    default:
      return new THREE.AmbientLight("#ffffff", 1);
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

const ImagesExt = [".png", ".jpg", ".jpeg"];
const VideoExt = [".mp4", ".webm"];
export const createAssets = (arr = []) => {
  let assetString = "";
  arr.forEach(val => {
    let name = val.name.replace(/[\W_]+/g, "");
    if (ImagesExt.includes(val.ext)) {
      assetString += `<img id="${name}" 
      src="http://localhost:9889/Assets/${val.name}"
      > \n`;
    } else if (val.ext === ".obj") {
      assetString += `<a-asset-item id="${val.name +
        val.objPath}" src="http://localhost:9889/Assets/${val.name}/${
        val.objPath
      }"></a-asset-item> \n
      <a-asset-item id="${val.name +
        val.mtlPath}" src="http://localhost:9889/Assets/${val.name}/${
        val.mtlPath
      }"></a-asset-item> \n
      `;
    } else if (val.ext === ".gltf") {
      assetString += `<a-asset-item id="${val.name +
        val.gltfPath}" src="${`http://localhost:9889/Assets/${val.name}/${
        val.gltfPath
      }`}"></a-asset-item> \n`;
    } else if (VideoExt.includes(val.ext)) {
      assetString += `<video id="${name}" autoplay loop="true" muted src="http://localhost:9889/Assets/${
        val.name
      }"></video> \n`;
    }
  });
  return assetString;
};

export const createScene = (threeData = []) => {
  let dataString = "";
  _.forEach(threeData, mesh => {
    const {
      objName,
      position,
      rotation,
      scale,
      visible,
      name,
      hashColor,
      objTexture,
      objPrimitive
    } = mesh;
    const id = name.length ? name : objName;
    const color = hashColor;
    const texture = objTexture ? "#" + objTexture.name : "";
    if (mesh.objPrimitive === "sky") {
      dataString += `<a-sky id="${id}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      color="${color}" src="${texture}" position="${mesh.position.x} ${
        mesh.position.y
      } ${mesh.position.z}" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh
        .rotation._y *
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
      color="${color}" src="${texture}" position="${mesh.position.x} ${
        mesh.position.y
      } ${mesh.position.z}" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh
        .rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"
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
      dataString += assignModelAttr(mesh);
    } else if (mesh.objType === "Light") {
      dataString += `<a-entity id="${id}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      light="type: ${mesh.objPrimitive}; color: ${color}; ${generateLigtProps(
        mesh.children[0]
      )}" position="${mesh.position.x} ${mesh.position.y} ${
        mesh.position.z
      }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"          
        visible="${mesh.visible}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-entity>`;
    } else {
      const geometryParams = setGeometryAframe(
        mesh.children[0].geometry.parameters,
        mesh.objPrimitive
      );
      dataString += `<a-entity id="${id}" 
      geometry="primitive: ${mesh.objPrimitive};${geometryParams}" 
      ${createAnimaionAttr(mesh.objAnimate, id)}
      material="color: ${color}; 
      ${mesh.objTexture ? "src:#" + mesh.objTexture.name : ""};
      transparent:${mesh.children[0].material.transparent};
      opacity:${mesh.children[0].material.opacity};
        " 
      position="${mesh.position.x} ${mesh.position.y} ${
        mesh.position.z
      }" scale="${mesh.scale.x} ${mesh.scale.y} ${
        mesh.scale.z
      }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}" 
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

const generateLigtProps = object => {
  let data = "";
  const props = [
    "intensity",
    "angle",
    "distance",
    "decay",
    "penumbra",
    "castShadow"
  ];
  _.forEach(props, val => {
    if (object[val]) {
      let objValue = object[val];
      if (val === "angle") {
        objValue = object[val] * (180 / 3.14);
      }
      data += `${val}: ${objValue};`;
    }
  });
  return data;
};

const geomSelectedParams = {
  box: [{param:"width"}, {param:"height"}, {param:"depth"}],
  sphere: [{param:"radius"}],
  plane: [{param:"width"}, {param:"height"}],
  cylinder: [{param:"radiusTop"}, {param:"radiusBottom"}, {param:"height"}, {param:"openEnded"}],
  cone: [{param:"height"}, {param:"radius"}, {param:"openEnded"}],
  circle: [{param:"radius"}],
  ring: [{param:"innerRadius",name:"radiusInner"}, {param:"outerRadius",name:"radiusOuter"}]
};

const setGeometryAframe = (obj, type) => {
  let str = "";
  _.forEach(geomSelectedParams[type], val => {
    const name = val.name?val.name:val.param;
    str += `${name}:${obj[val.param]};`;
  });
  return str;
};

export const aframeTemplate = (
  assetArr,
  sceneArr,
  isCursor = false,
  isDefaultLights = true,
  script = "",
  config
) => {
  const { camera, fog } = config
  const { far, fov, near } = camera
  const { type, color, fognear, fogfar, density, enabled } = fog
  const fogString = enabled?
  type==='linear'?`fog="type: linear; color: ${color}; near:${fognear}; far:${fogfar};"`:`fog="type: exponential; color: ${color}; density:${density};"`:""
  // a new template is only been made on when assets are added, a new project got created, project got saved.
  return `<html><head><meta content="text/html;charset=utf-8" http-equiv="Content-Type"><meta content="utf-8" http-equiv="encoding">
  <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-animation-component@5.1.2/dist/aframe-animation-component.min.js"></script> 
  </head><body><a-scene background="color: #1c1c1c" vr-mode-ui="enabled: false" light="defaultLightsEnabled: false" ${fogString}>
  <a-camera far="${far}" fov="${fov}" near="${near}" look-controls-enabled="${camera["look-controls-enabled"]}" wasd-controls-enabled="${camera["wasd-controls-enabled"]}">
  ${
    isCursor ? `<a-cursor></a-cursor>` : ``
  }
  </a-camera>
  <a-assets>${createAssets(assetArr)}</a-assets>
  ${
    isDefaultLights
      ? `<a-entity light="type: ambient; color: #BBB" shadow="cast:true" ></a-entity>
    <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1" shadow="cast:true"></a-entity>`
      : ""
  }
  ${createScene(sceneArr)}</a-scene>
  <script type='text/javascript'>
  ${script}
  </script>
  </body></html>
  `;
};

const assignModelAttr = mesh => {
  const { objName, name, objModel } = mesh;
  const id = name.length ? name : objName;
  if (_.isEmpty(objModel)) {
    return `<a-entity id="${id}"
    ${createAnimaionAttr(mesh.objAnimate, id)}
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
      </a-entity> \n`;
  }
  if (objModel.ext === ".obj") {
    return `<a-entity id="${id}"
    ${createAnimaionAttr(mesh.objAnimate, id)}
    obj-model="obj: #${mesh.objModel.name + mesh.objModel.objPath}; mtl: #${mesh
      .objModel.name + mesh.objModel.mtlPath}"
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
      </a-entity> \n`;
  } else if (objModel.ext === ".gltf") {
    return `<a-gltf-model id="${id}"
    ${createAnimaionAttr(mesh.objAnimate, id)}
    src="#${mesh.objModel.name + mesh.objModel.gltfPath}"
    position="${mesh.position.x} ${mesh.position.y} ${
      mesh.position.z
    }" scale="${mesh.scale.x} ${mesh.scale.y} ${mesh.scale.z}" rotation="${mesh
      .rotation._x *
      (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
      (180 / 3.14)}"
      visible="${mesh.visible}" 
      >
      ${createScene(mesh.children.slice(1))}
      </a-gltf-model> \n`;
  } else if (objModel.ext === "poly") {
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
      </a-gltf-model> \n`;
  }
};
export const genericProperties = {
  transform: ["position", "rotation", "scale"],
  material: ["color", "opacity", "visible"]
};

export const genericPropertiesLights = {
  transform: ["position", "rotation", "scale"],
  light: ["intensity"]
};

export const genericPropertiesModels = {
  transform: ["position", "rotation", "scale"],
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
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
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
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  position: {
    name: "",
    type:"",
    property: "position",
    from: { x: 0, y: 0, z: 0 },
    to: { x: 0, y: 4, z: 0 },
    delay: 0,
    duration: 1200,
    direction: "reverse",
    easing: "linear",
    loop: true,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  color: {
    name: "",
    type:"",
    property: "color",
    from: "#E21F29",
    to: "#ffffff",
    delay: 0,
    duration: 1200,
    direction: "reverse",
    easing: "linear",
    loop: true,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  opacity: {
    name: "",
    type:"",
    property: "opacity",
    from: "1",
    to: "0",
    delay: 0,
    duration: 1200,
    direction: "alternate",
    easing: "linear",
    loop: true,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  fadeIn: {
    name: "",
    type:"",
    property: "opacity",
    from: "1",
    to: "0",
    delay: 0,
    duration: 1200,
    direction: "normal",
    easing: "linear",
    loop: false,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  fadeOut: {
    name: "",
    type:"",
    property: "opacity",
    from: "0",
    to: "1",
    delay: 0,
    duration: 1200,
    direction: "normal",
    easing: "linear",
    loop: false,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  },
  intensity: {
    name: "",
    type:"",
    property: "intensity",
    from: "1",
    to: "0",
    delay: 0,
    duration: 1200,
    direction: "alternate",
    easing: "linear",
    loop: true,
    loopvalue: 0,
    elasticity: 0,
    startevent: "",
    resumeevent: "",
    pauseevent: ""
  }
};

export const createAnimaionAttr = (animData, name) => {
  let data = "";
  const propertPrefix = {
    position: "",
    scale: "",
    rotation: "",
    opacity: "components.material.material.",
    color: "components.material.material.",
    intensity: "light."
  };
  if (animData.length) {
    _.forEach(animData, (anim, index) => {
      let from = anim.from,
        to = anim.to;
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
      }; type:${anim.property}; from: ${from}; to: ${to}; loop: ${
        anim.loop ? anim.loop : anim.loopvalue
      };delay:${anim.delay}; dur: ${anim.duration}; dir:${
        anim.direction
      }; easing: ${anim.easing}; elasticity: ${anim.elasticity}; 
      startEvents:${anim.startevent === "no event" ? "" : anim.startevent};
      resumeEvents:${anim.resumeevent === "no event" ? "" : anim.resumeevent};
      pauseEvents:${anim.pauseevent === "no event" ? "" : anim.pauseevent};"`;
    });
    return data;
  }
  return "";
};

export const isAlphaNumeric = str => {
  return str.match(/^[A-ZÀ-Ýa-zà-ý0-9_]+$/i) !== null;
};

export const animEvents = ["no event", "mouseleave", "mouseenter", "click"];

export const entityDataAttr = {
  Object3D: [
    "objName",
    "objType",
    "objPrimitive",
    "hashColor",
    "objAnimate",
    "name",
    "objTexture",
    "objModel",
    "position",
    "rotation",
    "scale",
    "visible"
  ],
  box: ["parameters", "material"],
  sphere: ["parameters", "material"],
  plane: ["parameters", "material"],
  cylinder: ["parameters", "material"],
  cone: ["parameters", "material"],
  ring: ["parameters", "material"],
  circle: ["parameters", "material"],
  point: ["color", "intensity", "distance", "decay"],
  spot: ["color", "intensity", "distance", "angle", "exponent", "decay"],
  hemisphere: ["skyColor", "intensity", "groundColor"],
  directional: ["color", "intensity"],
  ambient: ["color", "intensity"],
  Light: [
    "color",
    "skyColor",
    "groundColor",
    "intensity",
    "distance",
    "angle",
    "exponent",
    "decay",
    "castShadow"
  ]
};
