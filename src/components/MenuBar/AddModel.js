import * as THREE from '../ThreeLibManager';
import textureLoader from '../Helpers/textureLoader'
import videoLoader from '../Helpers/videoLoader'


const AddCube = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
    let material = new THREE.MeshPhongMaterial({
        color: 0xef2d5e
    });

    let obj = new THREE.Object3D();
    obj["objName"] = "Cube";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "box";
    obj["hashColor"] = "#ef2d5e";
    obj.add(new THREE.Mesh(geometry, material));
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddCubeGroup = (active,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
    let material = new THREE.MeshPhongMaterial({
        color: 0xef2d5e
    });

    let obj = new THREE.Object3D();
    obj["objName"] = "Cube";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "box";
    obj["hashColor"] = "#ef2d5e";
    obj.add(new THREE.Mesh(geometry, material));
    active.add(obj);
    
    // obj.position.set(pos.x,pos.y,pos.z);
    // obj.rotation._x=rot.x;
    // obj.rotation._y=rot.y;
    // obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}


const AddSphere = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
    let material = new THREE.MeshPhongMaterial({
        color: 0xef2d5e
    });

    let obj = new THREE.Object3D();
    obj["objName"] = "Sphere";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "sphere";
    obj["hashColor"] = "#ef2d5e";
    obj.add(new THREE.Mesh(geometry, material));
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddPlane = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let geometry = new THREE.PlaneBufferGeometry( 1, 1, 32, 32 )
    let material = new THREE.MeshPhongMaterial({
        color: 0xef2d5e
    });

    let obj = new THREE.Object3D();
    obj["objName"] = "Plane";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "plane";
    obj["hashColor"] = "#ef2d5e";
    obj.add(new THREE.Mesh(geometry, material));
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddPointLight = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let obj = new THREE.Object3D();
    let color = 0xffffff
    obj["objName"] = "PointLight";
    obj["objType"] = "Light";
    obj["objPrimitive"] = "point";
    obj["hashColor"] = "#ffffff";
    let light = new THREE.PointLight(color, 1, 0.0, 1);
    obj.add(light);
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddSpotLight = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let obj = new THREE.Object3D();
    let color = 0xffffff
    obj["objName"] = "SpotLight";
    obj["objType"] = "Light";
    obj["objPrimitive"] = "spot";
    obj["hashColor"] = "#ffffff";
    let light = new THREE.SpotLight(color);
    light.position.set(100, 1000, 100);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 30;    
    obj.add(light);
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddHemisphereLight = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let obj = new THREE.Object3D();
    let color = 0xffffff
    let groundColor = 0xffffff
    let intensity = 2
    obj["objName"] = "SpotLight";
    obj["objType"] = "Light";
    obj["objPrimitive"] = "spot";
    obj["hashColor"] = "#ffffff";
    let light = new THREE.HemisphereLight(color, groundColor,intensity);
    obj.add(light);
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddDirectionalLight = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let obj = new THREE.Object3D();
    let color = 0xffffff
    let intensity = 0.5
    obj["objName"] = "DirectionalLight";
    obj["objType"] = "Light";
    obj["objPrimitive"] = "spot";
    obj["hashColor"] = "#ffffff";
    let light = new THREE.DirectionalLight( color, intensity )
    obj.add(light);
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddSky = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let geometry = new THREE.SphereBufferGeometry( 5000, 64, 32);
    let material = new THREE.MeshBasicMaterial({
        color: 0xceecf0,
        side: THREE.BackSide,
        map: null,
    });

    let obj = new THREE.Object3D();
    obj["objName"] = "Sky";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "sky";
    obj["hashColor"] = "#ceecf0";
    obj.add(new THREE.Mesh(geometry, material));
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddModel = (scene,pos={x:0,y:0,z:0},rot={x:0,y:0,z:0},sca={x:0,y:0,z:0})=>{
    let obj = new THREE.Object3D();
    obj["objName"] = "3DModel";
    obj["objType"] = "Mesh";
    obj["objPrimitive"] = "3DModel";
    scene.add(obj);
    obj.position.set(pos.x,pos.y,pos.z);
    obj.rotation._x=rot.x;
    obj.rotation._y=rot.y;
    obj.rotation._z=rot.z;
    // obj.scale.x=sca.x;
    // obj.scale.y=sca.y;
    // obj.scale.z=sca.z
    // obj.scale.set(sca.x,sca.y,sca.z);
    return obj;
}

const AddGroupObj = (obj,type,scene,pos={x:0,y:0,z:0},rot={_x:0,_y:0,_z:0},sca={x:0,y:0,z:0})=>{
    switch(type){
        case "Cube":
            let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);

            let mapData 
            console.log(obj.objTexture);
            
            if(obj.objTexture && obj.objTexture.type==='image'){
                mapData = textureLoader(obj.objTexture.data)
            }
            else if(obj.objTexture && obj.objTexture.type==='video'){
                mapData = videoLoader(obj.objTexture.data)
            }
            else{
                mapData = null
            }
            let material = new THREE.MeshPhongMaterial({
                color: 0xef2d5e,
                map: mapData
            });
            let objCube = new THREE.Object3D();
            objCube["objName"] = "Cube";
            objCube["objType"] = "Mesh";
            objCube["objPrimitive"] = "box";
            objCube["hashColor"] = "#ef2d5e";
            objCube.add(new THREE.Mesh(geometry, material));
            scene.add(objCube);
            objCube.position.set(pos.x,pos.y,pos.z);
            objCube.rotation.set(rot._x,rot._y,rot._z)
            objCube.scale.set(sca.x,sca.y,sca.z);
            objCube.visible=obj.visible
            objCube.receiveShadow=obj.receiveShadow
            return objCube;
        break;
        case "Sphere":
            let geometrySphere = new THREE.SphereBufferGeometry( 1, 32, 32 );
            let materialSphere = new THREE.MeshPhongMaterial({
                color: 0xef2d5e
            });
            let objSphere = new THREE.Object3D();
            objSphere["objName"] = "Sphere";
            objSphere["objType"] = "Mesh";
            objSphere["hashColor"] = "#ef2d5e";
            objSphere["objPrimitive"] = "sphere";
            objSphere.add(new THREE.Mesh(geometrySphere, materialSphere));
            scene.add(objSphere);
            objSphere.position.set(pos.x,pos.y,pos.z);
            objSphere.rotation.set(rot._x,rot._y,rot._z)
            objSphere.scale.set(sca.x,sca.y,sca.z);
            objSphere.visible=obj.visible
            objSphere.receiveShadow=obj.receiveShadow
            return objSphere;
        break;
        case "Plane":
            let geometryPlane = new THREE.PlaneBufferGeometry( 1, 1, 32, 32 )
            let materialPlane = new THREE.MeshPhongMaterial({
                color: 0xef2d5e
            });
            let objPlane = new THREE.Object3D();
            objPlane["objName"] = "Plane";
            objPlane["objType"] = "Mesh";
            objPlane["objPrimitive"] = "plane";
            objPlane["hashColor"] = "#ef2d5e";
            objPlane.add(new THREE.Mesh(geometryPlane, materialPlane));
            scene.add(objPlane);
            objPlane.position.set(pos.x,pos.y,pos.z);
            objPlane.rotation.set(rot._x,rot._y,rot._z)
            objPlane.scale.set(sca.x,sca.y,sca.z);
            objPlane.visible=obj.visible
            objPlane.receiveShadow=obj.receiveShadow
            return objPlane;
        break;
        case "Sky":
            let skygeometry = new THREE.SphereBufferGeometry( 5000, 64, 32);
            let skymaterial = new THREE.MeshBasicMaterial({
                color: 0xceecf0,
                side: THREE.BackSide,
                map: null,
            });
            let objsky = new THREE.Object3D();
            objsky["objName"] = "Sky";
            objsky["objType"] = "Mesh";
            objsky["objPrimitive"] = "sky";
            objsky["hashColor"] = "#ceecf0";
            objsky.add(new THREE.Mesh(skygeometry, skymaterial));
            scene.add(objsky);
            objsky.position.set(pos.x,pos.y,pos.z);
            objsky.rotation.set(rot._x,rot._y,rot._z)
            objsky.scale.set(sca.x,sca.y,sca.z);
            objsky.visible=obj.visible
            objsky.receiveShadow=obj.receiveShadow
            return objsky;
        break;
        default:
        break;
    }
}

export { AddCube, AddCubeGroup, AddSphere, AddPlane, AddPointLight, AddSpotLight, AddHemisphereLight, AddDirectionalLight, AddSky,AddModel, AddGroupObj,  }