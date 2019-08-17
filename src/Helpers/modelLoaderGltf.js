import * as THREE from "./ThreeLibManager";
var gltfLoader = new THREE.GLTFLoader();


export const modelLoaderGltf = (object, url) => {
    console.log(object, url);
    
    gltfLoader.load( url, function ( response ) {
        object.children[0].add(response.scene)
    })
}