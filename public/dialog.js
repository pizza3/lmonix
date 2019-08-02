const { dialog, app } = require("electron");
const fs = require("fs");
const path = require("path");
const fsx = require("fs-extra");
const _ = require("lodash");

module.exports = { showSaveDialog, showOpenDialog, showAddDialog, saveState };

function showSaveDialog(browserWindow, threeData) {
  dialog.showSaveDialog(
    browserWindow,
    {
      defaultPath: path.join(app.getPath("documents"), "index.appvr")
    },
    filename => {
      if (filename) {
        if (!fs.existsSync(filename)) {
          fs.mkdirSync(filename);
        }
        fs.writeFile(
          filename + "/index.html",
          aframeTemplate(threeData.state.assetStack, threeData.data),
          "utf8",
          err => {
            if (err) {
              dialog.showErrorBox("Save Failed", err.message);
            }
          }
        );
        fs.mkdirSync(filename + "/scripts");
        fs.writeFile(filename + "/scripts/index.js", "", "utf8", err => {
          if (err) {
            dialog.showErrorBox("Save Failed", err.message);
          }
        });
        fs.mkdirSync(filename + "/Assets");
        let data = JSON.stringify(threeData);
        fs.writeFile(filename + "/data.json", data, "utf8", err => {
          if (err) {
            dialog.showErrorBox("Save Failed", err.message);
          }
        });
        browserWindow.webContents.send("ipcRenderer", {
          option: "changeTitle",
          title: filename
        });
        browserWindow.webContents.send("ipcRenderer", {
          option: "message",
          type: "success",
          message: "Project Created!"
        });
      }
    }
  );
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath("documents"),
      filters: [{ name: "Appvr files", extensions: ["appvr"] }]
    },
    filepaths => {
      if (filepaths) {
        fs.readFile(
          filepaths[0] + "/data.json",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              browserWindow.webContents.send("ipcRenderer", {
                option: "updateProject",
                obj: data,
                title: filepaths
              });
              readAssetFiles(filepaths[0],browserWindow)
            }
          }
        );
        fs.readFile(
          filepaths[0] + "/scripts/index.js",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              browserWindow.webContents.send("ipcRenderer", {
                option: "updateCode",
                code: data
              });
            }
          }
        );
        fs.readFile(
          filepaths[0] + "/index.html",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              browserWindow.webContents.send("ipcRenderer", {
                option: "updateCodeHtml",
                code: data
              });
            }
          }
        );
      }
    }
  );
}

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

function readAssetFiles (filePath, browserWindow){
  let fileArr = []
  fs.readdir(filePath + "/Assets/", (err, files) => {
    files.forEach(file => {
      const data = base64_encode(filePath + "/Assets/" + file);
      fileArr.push({
        name: file,
        path: filePath + "/Assets/" + file,
        ext: path.extname(filePath + "/Assets/" + file),
        data: data
      });
    });
    browserWindow.webContents.send("ipcRenderer", {
      option: "setAssetStack",
      assets: fileArr
    });
  });
}

function showAddDialog(browserWindow, arg) {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath("documents"),
      filters: [{ name: "Images", extensions: arg.filter }]
    },
    filepaths => {
      if (filepaths && filepaths.length) {
        const fileName = path.basename(filepaths[0]);
        fsx.copySync(
          path.resolve(filepaths[0]),
          arg.location + "/Assets/" + fileName
        );
        readAssetFiles(arg.location,browserWindow)
      }
    }
  );
}

function saveState(threeData, browserWindow) {
  if(threeData.state.title!=='untitled*'){
    if (threeData.location === "/code") {
      fs.writeFile(
        threeData.state.title + "/scripts/index.js",
        threeData.state.code,
        "utf8",
        err => {
          if (err) {
            browserWindow.webContents.send("ipcRenderer", {
              option: "message",
              type: "error",
              message: "err.message"
            });
          }
        }
      );
      browserWindow.webContents.send("updateVRView");
    } else {
      fs.writeFile(
        threeData.state.title + "/index.html",
        aframeTemplate(
          threeData.state.assetStack,
          threeData.data,
          threeData.state.isCursor,
          threeData.state.isDefaultLights
        ),
        "utf8",
        err => {
          if (err) {
            browserWindow.webContents.send("ipcRenderer", {
              option: "message",
              type: "error",
              message: "err.message"
            });
          }
        }
      );
      let data = JSON.stringify(threeData);
      fs.writeFile(threeData.state.title + "/data.json", data, "utf8", err => {
        if (err) {
          browserWindow.webContents.send("ipcRenderer", {
            option: "message",
            type: "error",
            message: "err.message"
          });
        }
      });
      browserWindow.webContents.send("ipcRenderer", {
        option: "message",
        type: "success",
        message: "Save Complete"
      });
    }
  }
  else{
    showSaveDialog(browserWindow,threeData)
  }
}

function createAssets(arr = []) {
  let assetString = "";
  arr.forEach(val => {
    let name = val.name.replace(/[\W_]+/g, "");
    if (val.ext === ".png" || val.ext === ".jpg" || val.ext === ".jpeg") {
      assetString += `<img id="${name}" src="./Assets/${val.name}"> \n`;
    } else if (val.ext === ".obj" || val.ext === ".mtl") {
      assetString += `<a-asset-item id="${name}" src="./Assets/${
        val.name
      }"></a-asset-item> \n`;
    } else {
      assetString += `<video id="${name}" src="./Assets/${
        val.name
      }"></video> \n`;
    }
  });
  return assetString;
}

function createScene(threeData = [], state = {}) {
  let dataString = "";
  _.forEach(threeData, (val, i) => {
    if (val.objPrimitive === "sky") {
      dataString += `<a-sky id="entity${i}" color="${val.hashColor}" src="${
        val.objTexture ? "#" + val.objTexture.name : ""
      }" position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" rotation="${val.rotation._x * (180 / 3.14)} ${val.rotation._y *
        (180 / 3.14)} ${val.rotation._z * (180 / 3.14)}"
        visible="${val.visible}" 
        material="
        opacity:${val.children[0].material.opacity};
        transparent:${val.children[0].material.transparent};
        "
        >
        ${createScene(val.children.slice(1))}
        </a-sky> \n`;
    } 
    else if(val.objPrimitive === "curvedimage"){
      const params = val.children[0].geometry.parameters
      dataString += `<a-curvedimage id="entity${i}" color="${val.hashColor}" src="${
        val.objTexture ? "#" + val.objTexture.name : ""
      }" position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" rotation="${val.rotation._x * (180 / 3.14)} ${val.rotation._y *
        (180 / 3.14)} ${val.rotation._z * (180 / 3.14)}"
        visible="${val.visible}" 
        material="
        opacity:${val.children[0].material.opacity};
        transparent:${val.children[0].material.transparent};
        "
        height="${params.height}" radius="${params.radius}" theta-length="${params.thetaLength}"
        >
        ${createScene(val.children.slice(1))}
        </a-curvedimage> \n`;
    }
    else if (val.objPrimitive === "3DModel") {
      dataString += `<a-entity id="entity${i}" obj-model="obj: ${
        val.objModel ? "#" + val.objModel.name : ""
      };"  position="${val.position.x} ${val.position.y} ${
        val.position.z
      }" scale="${val.scale.x} ${val.scale.y} ${val.scale.z}" rotation="${val
        .rotation._x *
        (180 / 3.14)} ${val.rotation._y * (180 / 3.14)} ${val.rotation._z *
        (180 / 3.14)}"
        shadow="receive:${val.receiveShadow};cast:${val.castShadow}" 
        visible="${val.visible}" 
        >
        ${createScene(val.children.slice(1))}
        </a-entity> \n`;
    } else if (val.objType === "Light") {
      dataString += `<a-entity id="entity${i}" light="type: ${
        val.objPrimitive
      }; color: ${val.hashColor}" position="${val.position.x} ${
        val.position.y
      } ${val.position.z}" rotation="${val.rotation._x * (180 / 3.14)} ${val
        .rotation._y *
        (180 / 3.14)} ${val.rotation._z * (180 / 3.14)}"          
        visible="${val.visible}" 
        >
        ${createScene(val.children.slice(1))}
        </a-entity>`;
    } else {
      const geometryParams = setGeometry(val.children[0].geometry.parameters);
      dataString += `<a-entity id="entity${i}" geometry="primitive: ${
        val.objPrimitive
      };${geometryParams}" material="color: ${val.hashColor}; 
      ${val.objTexture ? "src:#" + val.objTexture.name : ""};
      transparent:${val.children[0].material.transparent};
      opacity:${val.children[0].material.opacity};
        " 
      position="${val.position.x} ${val.position.y} ${val.position.z}" scale="${
        val.scale.x
      } ${val.scale.y} ${val.scale.z}" rotation="${val.rotation._x *
        (180 / 3.14)} ${val.rotation._y * (180 / 3.14)} ${val.rotation._z *
        (180 / 3.14)}" 
        shadow="receive:${val.children[0].receiveShadow};cast:${
        val.children[0].castShadow
      }" 
        visible="${val.visible}"
        >
        ${createScene(val.children.slice(1))}
        </a-entity> \n`;
    }
  });
  return dataString;
}

const setGeometry = obj => {
  let str = "";
  _.forEach(obj, (val, key) => {
    str += `${key}:${val};`;
  });
  return str;
};

function aframeTemplate(assetArr, sceneArr, isCursor, isDefaultLights = true) {
  // a new template is only been made on when assets are added, a new project got created, project got saved.
  return `<html><head>
                <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
                <meta content="utf-8" http-equiv="encoding">
                <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
            </head><body>
                <a-scene>
                    <a-camera>
                        ${isCursor ? `<a-cursor></a-cursor>` : ``}
                    </a-camera>
                    <a-assets>
                        ${createAssets(assetArr)}
                    </a-assets>
                        ${createScene(sceneArr)}
                </a-scene>
                <script type='text/javascript' src='./scripts/index.js'></script>
            </body>
        </html>
    `;
}
