import * as THREE from "./ThreeLibManager";
import _ from "lodash";
const mtlLoader = new THREE.MTLLoader();
const objLoader = new THREE.OBJLoader();
const gltfLoader = new THREE.GLTFLoader();
THREE.ImageUtils.crossOrigin = "anonymous";
mtlLoader.setCrossOrigin(true);
mtlLoader.crossOrigin = "";
objLoader.crossOrigin = "";

const modelLoader = async (threeDobj, directory, changeObjectProp) => {
  const {name, ext} = directory
  if (ext==='.obj') {
    const {objPath, mtlPath} = directory
    mtlLoader.setPath("http://localhost:9889/Assets/" + name + "/");
    mtlLoader.load(mtlPath, function(materials) {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.setPath("http://localhost:9889/Assets/" + name + "/");
      objLoader.load(
        objPath,
        function(object) {
          threeDobj.children[0].add(object);
          // finalObject = object
        },
        function(xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function(error) {
          console.log("An error happened");
        }
      );
    });
    if(!_.isUndefined(changeObjectProp)){
      changeObjectProp(
        directory,
        "objModel"
      );
    }

  }else if(ext==='.gltf'){
    const {gltfPath} = directory
    gltfLoader.load("http://localhost:9889/Assets/" + name + "/" + gltfPath, function ( response ) {
      if(!_.isUndefined(changeObjectProp)){
        changeObjectProp(response.scene, "", "addObject");
      }else{
        threeDobj.children[0].add(response.scene);
      }
    });
    if(!_.isUndefined(changeObjectProp)){
      changeObjectProp(
        directory,
        "objModel"
      );
    }
  }
};

export default modelLoader;
