import * as THREE from '../ThreeLibManager';


const videoLoader = (data)=>{
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