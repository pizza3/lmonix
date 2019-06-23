import * as THREE from '../ThreeLibManager';
const Loader = new THREE.OBJLoader();
const fs = window.require("fs");

const modelLoader = (obj)=>{
    console.log('obj',obj);
    
    let data = "data:video/webm;base64,"+fs.readFileSync(obj.objModel.path).toString('base64')
    // load a resource
    Loader.load(
        // resource URL
        data,
        // called when resource is loaded
        function ( object ) {
            obj.add(object)
            obj = {
                type: '.obj',
                path: obj.objModel.path,
                name:obj.objModel.path.name.replace(/[\W_]+/g,"")
            }
        },
        // called when loading is in progresses
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );      
}

export default modelLoader