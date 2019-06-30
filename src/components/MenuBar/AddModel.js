import * as THREE from "../ThreeLibManager";
import textureLoader from "../Helpers/textureLoader";
import videoLoader from "../Helpers/videoLoader";
import modelLoader from "../Helpers/modelLoader";
import _ from 'lodash'

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
  obj["objName"] = "Cube";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "box";
  obj["hashColor"] = "#ef2d5e";
  obj.add(new THREE.Mesh(geometry, material));
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
  return obj;
};

const AddCubeGroup = (
  active,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });

  let obj = new THREE.Object3D();
  obj["objName"] = "Cube";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "box";
  obj["hashColor"] = "#ef2d5e";
  obj.add(new THREE.Mesh(geometry, material));
  active.add(obj);

  // obj.position.set(pos.x,pos.y,pos.z);
  // obj.rotation._x=rot.x;
  // obj.rotation._y=rot.y;
  // obj.rotation._z=rot.z;
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
  return obj;
};

const AddSphere = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let geometry = new THREE.SphereBufferGeometry(1, 32, 32);
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });

  let obj = new THREE.Object3D();
  obj["objName"] = "Sphere";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "sphere";
  obj["hashColor"] = "#ef2d5e";
  obj.add(new THREE.Mesh(geometry, material));
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
  return obj;
};

const AddPlane = (
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
  let material = new THREE.MeshPhongMaterial({
    color: 0xef2d5e
  });

  let obj = new THREE.Object3D();
  obj["objName"] = "Plane";
  obj["objType"] = "Mesh";
  obj["objPrimitive"] = "plane";
  obj["hashColor"] = "#ef2d5e";
  obj.add(new THREE.Mesh(geometry, material));
  scene.add(obj);
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  obj.position.set(pos.x, pos.y, pos.z);
  obj.rotation._x = rot.x;
  obj.rotation._y = rot.y;
  obj.rotation._z = rot.z;
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
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
  // obj.scale.x=sca.x;
  // obj.scale.y=sca.y;
  // obj.scale.z=sca.z
  // obj.scale.set(sca.x,sca.y,sca.z);
  return obj;
};

const AddGroupObj = (
  obj,
  type,
  scene,
  pos = { x: 0, y: 0, z: 0 },
  rot = { _x: 0, _y: 0, _z: 0 },
  sca = { x: 0, y: 0, z: 0 }
) => {
  let mapData;
  if (obj.objTexture && obj.objTexture.type === "image") {
    mapData = textureLoader(obj.objTexture.path);
  } else if (obj.objTexture && obj.objTexture.type === "video") {
    mapData = videoLoader(obj.objTexture.data);
  } else {
    mapData = null;
  }
  let object = new THREE.Object3D();
  if(!_.isEmpty(obj)){
    object.position.set(pos.x, pos.y, pos.z);
    object.rotation.set(rot._x, rot._y, rot._z);
    object.scale.set(sca.x, sca.y, sca.z);  
  }
  switch (type) {
    case "box":
      let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
      let material = new THREE.MeshPhongMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xef2d5e,
        map: mapData
      });
      object["objName"] = "Cube";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "box";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometry, material));
      scene.add(object);
      object.objTexture = obj.objTexture?obj.objTexture:{};
      object.visible = obj.visible?obj.visible:true;
      object.children[0].receiveShadow = obj.children?obj.children[0].receiveShadow:false;
      object.children[0].castShadow = obj.children?obj.children[0].castShadow:false;
      return object;
      break;
    case "sphere":
      let geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32);
      let materialSphere = new THREE.MeshPhongMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xef2d5e,
        map: mapData
      });
      object["objName"] = "Sphere";
      object["objType"] = "Mesh";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object["objPrimitive"] = "sphere";
      object.add(new THREE.Mesh(geometrySphere, materialSphere));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
      break;
    case "plane":
      let geometryPlane = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
      let materialPlane = new THREE.MeshPhongMaterial({
        color: obj.hashColor
          ? parseInt(obj.hashColor.replace(/^#/, ""), 16)
          : 0xef2d5e,
        map: mapData
      });
      object["objName"] = "Plane";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "plane";
      object["hashColor"] = obj.hashColor || "#ef2d5e";
      object.add(new THREE.Mesh(geometryPlane, materialPlane));
      scene.add(object);
      object.objTexture = obj.objTexture;
      object.visible = obj.visible;
      object.children[0].receiveShadow = obj.children[0].receiveShadow;
      object.children[0].castShadow = obj.children[0].castShadow;
      return object;
      break;
    case "sky":
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
      return object;
      break;
    case "3DModel":
      object["objName"] = "3DModel";
      object["objType"] = "Mesh";
      object["objPrimitive"] = "3DModel";
      scene.add(object);
      object.visible = obj.visible;
      object.receiveShadow = obj.receiveShadow;
      if (obj.objModel) {
        object.objModel = obj.objModel;
        modelLoader(object,object.objModel);
      }
      return object;
      break;
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
      break;
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
      break;
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
      break;
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
      break;
    default:
      break;
  }
};

export {
  AddCube,
  AddCubeGroup,
  AddSphere,
  AddPlane,
  AddPointLight,
  AddSpotLight,
  AddHemisphereLight,
  AddDirectionalLight,
  AddSky,
  AddModel,
  AddGroupObj
};
