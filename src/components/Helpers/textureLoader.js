import * as THREE from '../ThreeLibManager';
const fs = window.require("fs");


const textureLoader = (path)=>{
    let data =
    "data:video/webm;base64," +
    fs.readFileSync(path).toString("base64");
    let texture = new THREE.TextureLoader().load(
        data,
        function ( texture ) {
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
    const point = new THREE.Vector2( 0.5, 0.5 );
    texture.center=point
    texture.rotation=3.14
    // texture.flipY=false
    return texture
}

export default textureLoader