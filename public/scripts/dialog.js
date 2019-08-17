const { dialog, app } = require("electron");
const fs = require("fs");
const path = require("path");
const fsx = require("fs-extra");
const _ = require("lodash");
const { setAssetServer, closeAssetServer } = require("./assetServer");

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
        fs.writeFile(
          filename + "/scripts/index.js",
          threeData.state.code,
          "utf8",
          err => {
            if (err) {
              dialog.showErrorBox("Save Failed", err.message);
            }
          }
        );
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
      closeAssetServer();
      setAssetServer({ location: filepaths[0] });
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
              readAssetFiles(filepaths[0], browserWindow);
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
  var bitmap;
  try {
    bitmap = fs.readFileSync(file);
  } catch (error) {
    console.log("error");
  }
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

function readAssetFiles(filePath, browserWindow) {
  let fileArr = [];
  fs.readdir(filePath + "/Assets/", (err, files) => {
    files.forEach(file => {
      var stats = fs.statSync(filePath + "/Assets/" + file);
      console.log("is file ? " + stats.isFile());
      if (stats.isFile()) {
        const data = base64_encode(filePath + "/Assets/" + file);
        fileArr.push({
          name: file,
          path: filePath + "/Assets/" + file,
          ext: path.extname(filePath + "/Assets/" + file),
          data: data
        });
      } else {
        const dirData = fs
          .readdirSync(filePath + "/Assets/" + file)
          .map(val => {
            return {
              name: val,
              ext: path.extname(filePath + "/Assets/" + file + val)
            };
          });
        const isObj = _.find(dirData, { ext: ".obj" });
        const isMtl = _.find(dirData, { ext: ".mtl" });
        const isGltf = _.find(dirData, { ext: ".gltf" });
        if(isObj){
          fileArr.push({
            name: file,
            path: filePath + "/Assets/" + file,
            ext: ".obj",
            objPath:isObj.name,
            mtlPath:isMtl.name
          });
        }else if(isGltf){
          fileArr.push({
            name: file,
            path: filePath + "/Assets/" + file,
            ext: ".gltf",
            gltfPath:isGltf.name
          });
        }
      }
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
      filters: [{ name: "Images", extensions: arg.filter }],
      // properties:["openFile","multiSelections"]
      properties: ["openDirectory"]
    },
    filepaths => {
      if (filepaths && filepaths.length) {
        if (arg.type) {
          const destDir = arg.location + "/Assets";
          copyFolderRecursiveSync(path.resolve(filepaths[0]), destDir);
        } else {
          const fileName = path.basename(filepaths[0]);
          fsx.copySync(
            path.resolve(filepaths[0]),
            arg.location + "/Assets/" + fileName
          );
        }
      }
    }
  );
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function saveState(threeData, browserWindow) {
  if (threeData.state.title !== "untitled*") {
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
  } else {
    showSaveDialog(browserWindow, threeData);
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
      assetString += `<video id="${name}" autoplay loop="true" src="./Assets/${
        val.name
      }"></video> \n`;
    }
  });
  return assetString;
}

const createScene = (threeData = []) => {
  let dataString = "";
  _.forEach(threeData, mesh => {
    const {
      objName,
      position,
      rotation,
      scale,
      visible,
      name,
      hashColor,
      objTexture,
      objPrimitive
    } = mesh;
    const id = name.length ? name : objName;
    const color = hashColor;
    const texture = objTexture ? "#" + objTexture.name : "";
    if (mesh.objPrimitive === "sky") {
      dataString += `<a-sky id="${id}" color="${color}" src="${texture}" position="${
        mesh.position.x
      } ${mesh.position.y} ${mesh.position.z}" rotation="${mesh.rotation._x *
        (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
        (180 / 3.14)}"
        visible="${mesh.visible}" 
        material="
        opacity:${mesh.children[0].material.opacity};
        transparent:${mesh.children[0].material.transparent};
        "
        >
        ${createScene(mesh.children.slice(1))}
        </a-sky> \n`;
    } else if (mesh.objPrimitive === "curvedimage") {
      const params = mesh.children[0].geometry.parameters;
      dataString += `<a-curvedimage id="${id}" color="${color}" src="${texture}" position="${
        mesh.position.x
      } ${mesh.position.y} ${mesh.position.z}" rotation="${mesh.rotation._x *
        (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
        (180 / 3.14)}"
        visible="${mesh.visible}" 
        material="
        opacity:${mesh.children[0].material.opacity};
        transparent:${mesh.children[0].material.transparent};
        "
        height="${params.height}" radius="${
        params.radiusTop
      }" theta-length="${(params.thetaLength * 180) / Math.PI}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-curvedimage> \n`;
    } else if (mesh.objPrimitive === "3DModel") {
      if (mesh.objModel.type === "poly") {
        dataString += `<a-gltf-model id="${id}"
        src="${mesh.objModel.path}"
        position="${mesh.position.x} ${mesh.position.y} ${
          mesh.position.z
        }" scale="${mesh.scale.x} ${mesh.scale.y} ${
          mesh.scale.z
        }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
          (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"
          visible="${mesh.visible}" 
          >
          ${createScene(mesh.children.slice(1))}
          </a-gltf-model> \n`;
      } else {
        dataString += `<a-entity id="${id}"
        obj-model="obj: url(${mesh.objModel.path});"
        position="${mesh.position.x} ${mesh.position.y} ${
          mesh.position.z
        }" scale="${mesh.scale.x} ${mesh.scale.y} ${
          mesh.scale.z
        }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
          (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}"
          shadow="receive:${mesh.receiveShadow};cast:${mesh.castShadow}" 
          visible="${mesh.visible}" 
          >
          ${createScene(mesh.children.slice(1))}
          </a-entity> \n`;
      }
    } else if (mesh.objType === "Light") {
      dataString += `<a-entity id="${id}" light="type: ${
        mesh.objPrimitive
      }; color: ${color}; ${generateLigtProps(mesh.children[0])}" position="${
        mesh.position.x
      } ${mesh.position.y} ${mesh.position.z}" rotation="${mesh.rotation._x *
        (180 / 3.14)} ${mesh.rotation._y * (180 / 3.14)} ${mesh.rotation._z *
        (180 / 3.14)}"          
        visible="${mesh.visible}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-entity>`;
    } else {
      const geometryParams = setGeometryAframe(
        mesh.children[0].geometry.parameters
      );
      dataString += `<a-entity id="${id}" 
      geometry="primitive: ${mesh.objPrimitive};${geometryParams}" 
      ${createAnimaionAttr(mesh.objAnimate)}
      material="color: ${color}; 
      ${mesh.objTexture ? "src:#" + mesh.objTexture.name : ""};
      transparent:${mesh.children[0].material.transparent};
      opacity:${mesh.children[0].material.opacity};
        " 
      position="${mesh.position.x} ${mesh.position.y} ${
        mesh.position.z
      }" scale="${mesh.scale.x} ${mesh.scale.y} ${
        mesh.scale.z
      }" rotation="${mesh.rotation._x * (180 / 3.14)} ${mesh.rotation._y *
        (180 / 3.14)} ${mesh.rotation._z * (180 / 3.14)}" 
        shadow="receive:${mesh.children[0].receiveShadow};cast:${
        mesh.children[0].castShadow
      }" 
        visible="${mesh.visible}"
        >
        ${createScene(mesh.children.slice(1))}
        </a-entity> \n`;
    }
  });
  return dataString;
};

const generateLigtProps = object => {
  let data = "";
  const props = [
    "intensity",
    "angle",
    "distance",
    "decay",
    "penumbra",
    "castShadow"
  ];
  _.forEach(props, val => {
    if (object[val]) {
      let objValue = object[val];
      if (val === "angle") {
        objValue = object[val] * (180 / 3.14);
      }
      data += `${val}: ${objValue};`;
    }
  });
  return data;
};

const setGeometryAframe = obj => {
  let str = "";
  _.forEach(obj, (val, key) => {
    str += `${key}:${val};`;
  });
  return str;
};

const createAnimaionAttr = animData => {
  let data = "";
  const propertPrefix = {
    position: "",
    scale: "",
    rotation: "",
    opacity: "components.material.material.",
    color: "components.material.material."
  };
  if (animData.length) {
    _.forEach(animData, (anim, index) => {
      let from = anim.from,
        to = anim.to;
      if (anim.property === "rotation") {
        from = `${anim.from.x * (180 / 3.14)} ${anim.from.y *
          (180 / 3.14)} ${anim.from.z * (180 / 3.14)}`;
        to = `${anim.to.x * (180 / 3.14)} ${anim.to.y * (180 / 3.14)} ${anim.to
          .z *
          (180 / 3.14)}`;
      } else if (anim.property === "position" || anim.property === "scale") {
        from = `${anim.from.x} ${anim.from.y} ${anim.from.z}`;
        to = `${anim.to.x} ${anim.to.y} ${anim.to.z}`;
      }
      data += ` 
      animation__${anim.name}="property: ${propertPrefix[anim.property]}${
        anim.property
      }; type:${anim.property}; from: ${from}; to: ${to}; loop: ${
        anim.loop
      };delay:${anim.delay}; dur: ${anim.duration}; dir:${
        anim.direction
      }; easing: ${anim.easing}; elasticity: ${anim.elasticity};"`;
    });
    return data;
  }
  return "";
};

function aframeTemplate(assetArr, sceneArr, isCursor, isDefaultLights = true) {
  // a new template is only been made on when assets are added, a new project got created, project got saved.
  return `<html><head>
                <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
                <meta content="utf-8" http-equiv="encoding">
                <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
                <script src="https://unpkg.com/aframe-animation-component@5.1.2/dist/aframe-animation-component.min.js"></script>              
            </head><body>
                <a-scene false" light="defaultLightsEnabled: false">
                    <a-camera>
                        ${isCursor ? `<a-cursor></a-cursor>` : ``}
                    </a-camera>
                    <a-assets>
                        ${createAssets(assetArr)}
                    </a-assets>
                    ${
                      isDefaultLights
                        ? `<a-entity light="type: ambient; color: #BBB" shadow="cast:true" ></a-entity>
                      <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1" shadow="cast:true"></a-entity>`
                        : ""
                    }
                        ${createScene(sceneArr)}
                </a-scene>
                <script type='text/javascript' src='./scripts/index.js'></script>
            </body>
        </html>
    `;
}
