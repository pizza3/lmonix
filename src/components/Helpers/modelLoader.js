import * as THREE from '../ThreeLibManager';
const Loader = new THREE.OBJLoader();

const modelLoader = (data,obj)=>{
    // load a resource
    Loader.load(
        // resource URL
        data,
        // called when resource is loaded
        function ( object ) {
            obj.add(object)
            // objPresent.objModel = {
            //     type: '.obj',
            //     data: object,
            //     name:self.props.assetStack[i].name.replace(/[\W_]+/g,"")
            // }
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