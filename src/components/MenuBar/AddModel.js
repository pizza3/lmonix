/* eslint-disable no-case-declarations */
import * as THREE from "../../helpers/ThreeLibManager";
import textureLoader from "../../helpers/textureLoader";
import videoLoader from "../../helpers/videoLoader";
import modelLoader from "../../helpers/modelLoader";
import _ from "lodash";
import { updateGeometry, updateLights } from "../../helpers/helpers";
import { modelLoaderGltf } from "../../helpers/modelLoaderGltf";
import { helvetiker } from '../../assets/fonts'
// import Lato from "../../assets/Lato-Regular-16.fnt"
// const loader = new THREE.FontLoader();
const createGeometry = require("three-bmfont-text");
const loadFont = require("load-bmfont");
var MSDFShader = require("three-bmfont-text/shaders/msdf");

const AddCube = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
  const material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });
  let obj = new THREE.Object3D();
  obj.matrixAutoUpdate = false;
  obj.name = "";
  obj["objName"] = "Mesh";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "box";
  obj["hashColor"] = "#feb3c7";
  obj["objAnimate"] = [];
  obj.add(new THREE.Mesh(geometry, material));
  return obj;
};

const AddAmbientLight = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  obj.matrixAutoUpdate = false;
  const color = 0xffffff;
  const intensity = 0.5;
  obj["objName"] = "Light";
  obj["objType"] = "Light";
  obj["objPrimitive"] = "ambient";
  obj["hashColor"] = "#ffffff";
  obj["objAnimate"] = [];
  let light = new THREE.AmbientLight(color, intensity);
  obj.add(light);
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
  obj.matrixAutoUpdate = false;
  obj["objName"] = "Sky";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "sky";
  obj["hashColor"] = "#ceecf0";
  obj["objAnimate"] = [];
  obj.add(new THREE.Mesh(geometry, material));
  obj.scale.set(-1, 1, 1);
  return obj;
};

const AddModel = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let obj = new THREE.Object3D();
  obj.add(new THREE.Object3D());
  obj.matrixAutoUpdate = false;
  obj["objAnimate"] = [];
  obj["objName"] = "3DModel";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "3DModel";
  obj["objModel"] = {};
  return obj;
};

const AddCurvedImage = scene => {
  let obj = new THREE.Object3D();
  obj.matrixAutoUpdate = false;
  let material = new THREE.MeshBasicMaterial({
    color: 0xceecf0,
    side: THREE.DoubleSide,
    map: null
  });
  let geometryCylinder = updateGeometry(
    "CylinderBufferGeometry",
    {},
    {
      radiusTop: 2,
      radiusBottom: 2,
      openEnded: true,
      radialSegments: 48,
      thetaLength: (3 * Math.PI) / 2
    }
  );
  obj["objAnimate"] = [];
  obj["objName"] = "CurvedImage";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "curvedimage";
  obj["hashColor"] = "#feb3c7";
  obj.add(new THREE.Mesh(geometryCylinder, material));
  return obj;
};

const AddText = (scene, addInScene) => {
  let object = new THREE.Object3D();
  // object.matrixAutoUpdate = false;
  object["objName"] = "Text";
  object["objType"] = "Mesh";
  object["objPrimitive"] = "text";
  object["hashColor"] = "#ceecf0";
  let mesh;
  let geometry;
  let textureLoader;

  // loadFont(
  //   "https://raw.githubusercontent.com/Jam3/three-bmfont-text/master/test/fnt/Roboto-msdf.json",
  //   function(err, font) {
  //     var geometry = createGeometry({
  //       width: 300,
  //       align: "center",
  //       font: font,
  //       text: "Hey It works",
  //       flipY: false
  //     });
  //     // geometry.update('Lorem ipsum\nDolor sit amet.')
  //     console.log(geometry.layout.height);
  //     console.log(geometry.layout.descender);

  //     var textureLoader = new THREE.TextureLoader();
  //     textureLoader.load(
  //       "https://raw.githubusercontent.com/Jam3/three-bmfont-text/master/test/fnt/Roboto-msdf.png",
  //       function(texture) {
  //         texture.needsUpdate = true;
  //         texture.minFilter = THREE.LinearMipMapLinearFilter;
  //         texture.magFilter = THREE.LinearFilter;

  //         // var material = new THREE.MeshBasicMaterial({
  //         //   map: texture,
  //         //   transparent: true,
  //         //   color: 0xaaffff
  //         // })
  //         var material = new THREE.RawShaderMaterial(
  //           MSDFShader({
  //             map: texture,
  //             transparent: true,
  //             color: 0xaaffff
  //           })
  //         );

  //         var mesh = new THREE.Mesh(geometry, material);
  //         mesh.position.set(
  //           0,
  //           -geometry.layout.descender + geometry.layout.height,
  //           0
  //         );
  //         mesh.scale.multiplyScalar(Math.random() * 0.5 + 0.5);

  //         // mesh.scale.multiplyScalar(-0.005)
  //         console.log("mesh", mesh);
  //         obj.add(mesh);
  //         scene.add(obj);
  //         addInScene(obj);
  //         // return obj;
  //       }
  //     );
  //   }
  // );
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e,
  })

  // const testFont = new THREE.Font(roboto);
  // const textgeometry = new THREE.TextBufferGeometry("Hello three.js!", {
  //   font: testFont,
  //   size: 1,
  //   height: 0.08,
  //   curveSegments: 20,
  //   // bevelEnabled: true,
  //   bevelThickness: 1,
  //   bevelSize: 1,
  //   bevelOffset: 0,
  //   bevelSegments: 1
  // });
  // object = new THREE.Object3D();
  // object.add(new THREE.Mesh(textgeometry, material));
  // object["objName"] ="Text";
  // object["objType"] = "Mesh";
  // object["objPrimitive"] = "text";
  // object["hashColor"] = "#ceecf0";
  // scene.add(object);
  // object.position.set(0, 0, 0);
  // return object;

   const testFont = new THREE.Font(helvetiker);
      const textgeometry = new THREE.TextBufferGeometry("Hello three.js!", {
        font: testFont,
        size: 1,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
      });
      object = new THREE.Object3D();
      object.add(new THREE.Mesh(textgeometry, material));
      object["objName"] ="Text";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "text";
      object["hashColor"] = "#ceecf0";
      scene.add(object);
      // object.matrixAutoUpdate = false
};

export const ApplyTexture = obj => {
  let mapData = null;
  if (obj.objTexture && obj.objTexture.type === "image") {
    mapData = textureLoader(obj.objTexture.path);
  } else if (obj.objTexture && obj.objTexture.type === "video") {
    mapData = videoLoader(obj.objTexture.path);
  }
  return mapData;
};

const AddGroupObj = (
  obj,
  type,
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { _x: 0, _y: 0, _z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let mapData = ApplyTexture(obj);
  let object = new THREE.Object3D();
  if (!_.isEmpty(obj)) {
    object.position.set(pos.x, pos.y, pos.z);
    object.rotation.set(rot._x, rot._y, rot._z);
    object.scale.set(sca.x, sca.y, sca.z);
  }
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });
  let geometryParams = {};
  if (
    !_.isEmpty(obj) &&
    !_.isEmpty(obj.children) &&
    obj.objType === "Mesh" &&
    obj.objPrimitive !== "3DModel"
  ) {
    if (!_.isEmpty(obj.children[0])) {
      geometryParams = obj.children[0].geometry.parameters;
      material = new THREE.MeshPhongMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xef2d5e,
        map: mapData,
        opacity: obj ? obj.children[0].material.opacity : 1,
        transparent: obj ? obj.children[0].material.transparent : false
      });
    }
  }
  object.name = obj.name || "";
  object.objAnimate = obj.objAnimate ? obj.objAnimate : [];
  switch (type) {
    case "box":
      const geometry = updateGeometry("BoxBufferGeometry", {}, geometryParams);
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "box";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometry, material));
      scene.add(object);
      object["objTexture"] = obj.objTexture ? obj.objTexture : {};
      object.visible = !_.isUndefined(obj.visible) ? obj.visible : true;
      object.children[0].receiveShadow = obj.children
        ? obj.children[0].receiveShadow
        : false;
      object.children[0].castShadow = obj.children
        ? obj.children[0].castShadow
        : false;
      // object.matrixAutoUpdate = false
      return object;
    case "sphere":
      let geometrySphere = updateGeometry(
        "SphereBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object["objPrimitive"] = "sphere";
      object.add(new THREE.Mesh(geometrySphere, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "plane":
      let geometryPlane = updateGeometry(
        "PlaneBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "plane";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometryPlane, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "cylinder":
      let geometryCylinder = updateGeometry(
        "CylinderBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "cone";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometryCylinder, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow || false;
      // object.matrixAutoUpdate = false
      return object;
    case "cone":
      let geometryCone = updateGeometry(
        "ConeBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "cone";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometryCone, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "ring":
      let geometryRing = updateGeometry(
        "RingBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "ring";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometryRing, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "circle":
      let geometryCircle = updateGeometry(
        "CircleBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "Mesh";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "circle";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.add(new THREE.Mesh(geometryCircle, material));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "sky":
      if (mapData) mapData.rotation = 0;
      let skygeometry = new THREE.SphereBufferGeometry(5000, 64, 32);
      let skymaterial = new THREE.MeshBasicMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xceecf0,
        side: THREE.BackSide,
        map: mapData
      });
      object["objName"] = obj.objName ? obj.objName : "Sky";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "sky";
      object["hashColor"] = obj.hashColor || "#ceecf0";
      object.add(new THREE.Mesh(skygeometry, skymaterial));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow || false;
      object.children[0].castShadow = obj.children[0].castShadow;
      object.scale.set(-1, 1, 1);
      // object.matrixAutoUpdate = false
      return object;
    case "3DModel":
      object["objName"] = obj.objName ? obj.objName : "3DModel";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "3DModel";
      object["objModel"] = obj.objModel;
      object.add(new THREE.Object3D());
      if (obj.objModel) {
        if (obj.objModel.ext === ".obj" || obj.objModel.ext === ".gltf") {
          modelLoader(object, object.objModel);
        } else if (obj.objModel.ext === "poly") {
          modelLoaderGltf(object, obj.objModel.path);
        }
      }

      scene.add(object);
      object.visible = obj.visible;
      object.receiveShadow = obj.receiveShadow;
      // object.matrixAutoUpdate = false
      return object;
    case "point":
      object["objName"] = obj.objName ? obj.objName : "Light";
      object["objType"] = "Light";
      object["objPrimitive"] = "point";
      object["hashColor"] = obj.hashColor || "#ffffff";
      let pointChild = obj.children?obj.children[0]:{}
      let pointLight = updateLights("PointLight", pointChild);
      pointLight.castShadow = obj.children?obj.children[0].castShadow: false;
      object.add(pointLight);
      object.visible = obj.visible;
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    case "spot":
      object["objName"] = obj.objName ? obj.objName : "Light";
      object["objType"] = "Light";
      object["objPrimitive"] = "spot";
      object["hashColor"] = obj.hashColor || "#ffffff";
      let spotChild = obj.children?obj.children[0]:{}
      let spotlight = updateLights("SpotLight", spotChild);
      spotlight.position.set(100, 1000, 100);
      spotlight.castShadow = obj.children?obj.children[0].castShadow: false;
      spotlight.shadow.mapSize.width = 1024;
      spotlight.shadow.mapSize.height = 1024;
      spotlight.shadow.camera.near = 500;
      spotlight.shadow.camera.far = 4000;
      spotlight.shadow.camera.fov = 30;
      object.add(spotlight);
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    case "hemisphere":
      object["objName"] = obj.objName ? obj.objName : "Light";
      object["objType"] = "Light";
      object["objPrimitive"] = "hemisphere";
      object["hashColor"] = obj.hashColor || "#ffffff";
      let hemisphereChild = obj.children?obj.children[0]:{}
      let hemispherelight = updateLights("HemisphereLight", hemisphereChild);
      hemispherelight.castShadow = obj.children?obj.children[0].castShadow: false;
      object.add(hemispherelight);
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    case "directional":
      object["objName"] = obj.objName ? obj.objName : "Light";
      object["objType"] = "Light";
      object["objPrimitive"] = "directional";
      object["hashColor"] = obj.hashColor || "#ffffff";
      let directionalChild = obj.children?obj.children[0]:{}
      let lightdirectional = updateLights("DirectionalLight", directionalChild);
      lightdirectional.castShadow = obj.children?obj.children[0].castShadow: false;
      object.add(lightdirectional);
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    case "ambient":
      object["objName"] = obj.objName ? obj.objName : "Light ";
      object["objType"] = "Light";
      object["objPrimitive"] = "ambient";
      object["hashColor"] = obj.hashColor || "#ffffff";
      // var ambientlight = new THREE.AmbientLight(obj.hashColor,1);
      let ambientChild = obj.children?obj.children[0]:{}
      const ambientlight = updateLights("AmbientLight", ambientChild);
      ambientlight.castShadow =obj.children?obj.children[0].castShadow: false;
      object.add(ambientlight);
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    case "text":
      // const testFont = new THREE.Font(helvetikerBold);
      // const textgeometry = new THREE.TextBufferGeometry("Hello three.js!", {
      //   font: testFont,
      //   size: 90,
      //   height: 1,
      //   curveSegments: 12,
      //   bevelEnabled: true,
      //   bevelThickness: 1,
      //   bevelSize: 8,
      //   bevelOffset: 0,
      //   bevelSegments: 5
      // });
      // object = new THREE.Object3D();
      // object.add(new THREE.Mesh(textgeometry, material));
      // object["objName"] =obj.objName? obj.objName:"Text";
      // object["objType"] = "Mesh";
      // object["objPrimitive"] = "text";
      // object["hashColor"] = "#ceecf0";
      // scene.add(object);
      // object.position.set(pos.x, pos.y, pos.z);
      // object.rotation._x = rot.x;
      // object.rotation._y = rot.y;
      // object.rotation._z = rot.z;
      // object.matrixAutoUpdate = false
      return object;
    case "curvedimage":
      let geometryCurvedimage = updateGeometry(
        "CylinderBufferGeometry",
        {},
        geometryParams
      );
      object["objName"] = obj.objName ? obj.objName : "CurvedImage";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "curvedimage";
      object["hashColor"] = obj.hashColor || "#feb3c7";
      object.objTexture = obj.objTexture;
      material.side = THREE.DoubleSide;
      object.add(new THREE.Mesh(geometryCurvedimage, material));
      scene.add(object);
      // object.matrixAutoUpdate = false
      return object;
    default:
  }
};

export {
  AddCube,
  AddAmbientLight,
  AddSky,
  AddModel,
  AddGroupObj,
  AddText,
  AddCurvedImage
};
