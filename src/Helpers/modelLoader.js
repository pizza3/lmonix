import * as THREE from "./ThreeLibManager";
const mtlLoader = new THREE.MTLLoader();
mtlLoader.setCrossOrigin( true );

const objLoader = new THREE.OBJLoader();
// const fs = window.require("fs");

const modelLoader = async (threeDobj, obj) => {
  mtlLoader.setPath("http://localhost:8000");
  console.log(obj);
  const newName = obj.name.replace("obj", ".obj");
  const url = newName.replace("obj", "mtl");
  let finalObject
    mtlLoader.load("/Assets/" + url, function(materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.setPath("http://localhost:8000");
    objLoader.load(
      "/Assets/" + newName,
      function(object) {
        threeDobj.add(object);
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
//   return finalObject
};

export default modelLoader;
