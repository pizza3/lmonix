import * as THREE from './ThreeLibManager';
const fs = window.require("fs");


const videoLoader = (path)=>{
    let data =
    "data:video/webm;base64," +
    fs.readFileSync(path).toString("base64");
    let video = document.createElement( 'video' );
        video.src = data;
        video.width = 640;
        video.height = 360;
        video.loop = true;
        video.muted = true;
        video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
        video.play();
        var texture = new THREE.VideoTexture( video );
    return texture
}

export default videoLoader