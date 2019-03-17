// import * as THREE from 'three';
const THREE = require('three')
global.THREE = THREE;
//controllers
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/OBJLoader');
require('three/examples/js/controls/TrackballControls');
require('three/examples/js/controls/TransformControls');
require('three/examples/js/controls/PointerLockControls');
//shaders
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/postprocessing/ShaderPass');
require('three/examples/js/postprocessing/BloomPass');

require('three/examples/js/shaders/FXAAShader');
require('three/examples/js/shaders/CopyShader');
require('three/examples/js/shaders/ConvolutionShader');

module.exports = global.THREE;
// export default THREE