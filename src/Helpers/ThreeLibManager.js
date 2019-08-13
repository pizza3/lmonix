// import * as THREE from 'three';
const THREE = require('three')
global.THREE = THREE;
//controllers
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/OBJLoader');
require('three/examples/js/loaders/MTLLoader');
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/controls/PointerLockControls');
module.exports = global.THREE;
// export default THREE