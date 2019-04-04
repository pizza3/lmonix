const {dialog, app} = require('electron');
const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');
module.exports = {showSaveDialog,showOpenDialog,showAddDialog,saveState};

function showSaveDialog(browserWindow,threeData){
    dialog.showSaveDialog(browserWindow,{
        defaultPath:path.join(app.getPath('documents'),'index.appvr')
    },(filename)=>{
        if(filename){
            if (!fs.existsSync(filename)){
                fs.mkdirSync(filename);
            }
            fs.writeFile(filename+'/index.html',aframeTemplate(),'utf8',(err)=>{
                if(err){
                    dialog.showErrorBox('Save Failed',err.message);
                }
            })
            fs.mkdirSync(filename+'/scripts')
            fs.writeFile(filename+'/scripts/index.js','','utf8',(err)=>{
                if(err){
                    dialog.showErrorBox('Save Failed',err.message);
                }
            })
            fs.mkdirSync(filename+'/Assets')
            let data = JSON.stringify(threeData)
            fs.writeFile(filename+'/data.json',data,'utf8',(err)=>{
                if(err){
                    dialog.showErrorBox('Save Failed',err.message);
                }
            })
            browserWindow.webContents.send("ipcRenderer",{option:"changeTitle", title:filename});   
        }
    })
}

function showOpenDialog(browserWindow) {
    dialog.showOpenDialog(browserWindow,{
        defaultPath:app.getPath('documents'),
        filters:[
            {name:'Appvr files', extensions:['appvr']}
        ]
    },(filepaths)=>{
        if(filepaths){
            fs.readFile(filepaths[0]+'/data.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    let obj = JSON.parse(data); //now it is an object
                    browserWindow.webContents.send("ipcRenderer",{option:"updateProject", obj,title:filepaths}); 
                    fs.readdir(filepaths[0]+'/Assets/', (err, files) => {
                        let fileArr = []             
                        files.forEach(file => {
                          fileArr.push({
                            name:file,
                             path:filepaths[0]+'/Assets/'+file,
                             ext:path.extname(filepaths[0]+'/Assets/'+file),
                            })
                        });
                        browserWindow.webContents.send("ipcRenderer",{option:"setAssetStack",assets:fileArr}); 
                        // fsx.copySync(path.resolve(filepaths[0]),'src/assets/project');
                      });                        
                }
            });
        }
    })
}

function showAddDialog(browserWindow,arg){
    dialog.showOpenDialog(browserWindow,{
        defaultPath:app.getPath('documents'),
        filters:[
            { name: 'Images', extensions: arg.filter }
        ]
    },(filepaths)=>{
        const fileName = path.basename(filepaths[0])
        fsx.copySync(path.resolve(filepaths[0]),arg.location+'/Assets/'+fileName);
        fs.readdir(arg.location+'/Assets/', (err, files) => {
            let fileArr = []
            files.forEach(file => {
              fileArr.push({
                 name:file,
                 path:filepaths[0],
                 ext:path.extname(filepaths[0]+'/Assets/'+file),
                })
            });
            fs.writeFile(arg.location+'/index.html',aframeTemplate(fileArr),'utf8',(err)=>{
                if(err){
                    dialog.showErrorBox('Save Failed',err.message);
                }
            })
            browserWindow.webContents.send("ipcRenderer",{option:"setAssetStack",assets:fileArr}); 
          });  
    });
}

function saveState(threeData){
    fs.writeFile(threeData.state.title+'/index.html',aframeTemplate(threeData.state.assetStack,threeData.data),'utf8',(err)=>{
        if(err){
            dialog.showErrorBox('Save Failed',err.message);
        }
       
    })
    let data = JSON.stringify(threeData)
    fs.writeFile(threeData.state.title+'/data.json',data,'utf8',(err)=>{
        if(err){
            dialog.showErrorBox('Save Failed',err.message);
        }
    })
}

function createAssets(arr=[]){
    let assetString="";
    arr.forEach((val)=>{
        let name  = val.name.replace(/[\W_]+/g,"");
        if(val.ext==='.png'||val.ext==='.jpg'){
            assetString+=`<img id="${name}" src="./Assets/${val.name}"> \n`
        }
        else if(val.ext==='.obj'||val.ext==='.mtl'){
            assetString+=`<a-asset-item id="${name}" src="./Assets/${val.name}"></a-asset-item> \n`
        }
        else{
            assetString+=`<video id="${name}" src="./Assets/${val.name}"></video> \n`
        }
    })
    return assetString
}

function createScene(threeData=[], state={}){
    let dataString = ""
    threeData.map((val) => {
        if(val.objPrimitive === "sky"){
            dataString+= `<a-sky color="${val.hashColor}" src="${val.objTexture?"#"+val.objTexture.name:""}" position="${val.position.x} ${val.position.y} ${val.position.z}" rotation="${val.rotation._x* (180 / 3.14)} ${val.rotation._y* (180 / 3.14)} ${val.rotation._z* (180 / 3.14)}"></a-sky> \n`
        }
        else if(val.objPrimitive==="3DModel"){
            dataString+= `<a-entity obj-model="obj: ${val.objModel?"#"+val.objModel.name:""};"  position="${val.position.x} ${val.position.y} ${val.position.z}" scale="${val.scale.x} ${val.scale.y} ${val.scale.z}" rotation="${val.rotation._x* (180 / 3.14)} ${val.rotation._y* (180 / 3.14)} ${val.rotation._z* (180 / 3.14)}"></a-entity> \n`
        }
        else{
            dataString+= `<a-entity geometry="primitive: ${val.objPrimitive};" material="color: ${val.hashColor}; src: ${val.objTexture?"#"+val.objTexture.name:""}" position="${val.position.x} ${val.position.y} ${val.position.z}" scale="${val.scale.x} ${val.scale.y} ${val.scale.z}" rotation="${val.rotation._x* (180 / 3.14)} ${val.rotation._y* (180 / 3.14)} ${val.rotation._z* (180 / 3.14)}"></a-entity> \n`
        }
    })
    return dataString
}

// function checkObjPrimitive(obj){
//     if(obj.objPrimitive === "sky"){
//         return `<a-sky color= ${obj.hashColor} src= ${obj.objTexture?obj.objTexture.name:null}></a-sky>`
//     }
//     else{

//     }
// }

function aframeTemplate(assetArr,sceneArr){
    // a new template is only been made on when assets are added, a new project got created, project got saved.
    return(
    `   <html>
            <head>
                <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
                <meta content="utf-8" http-equiv="encoding">
                <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
            </head>
            <body>
                <a-scene>
                    <a-assets>
                        ${createAssets(assetArr)}
                    </a-assets>
                        ${createScene(sceneArr)}
                </a-scene>
                <script type='text/javascript' src='./scripts/index.js'></script>
            </body>
        </html>
    `
    )
}
