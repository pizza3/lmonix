const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require("electron");
const isWindows = process.platform === "win32";
const {
  showSaveDialog,
  showOpenDialog,
  showAddDialog,
  saveState
} = require("./dialog");
const https = require("https");
const fs = require("fs");
const os = require("os");
const express = require("express");
const expressapp = express();
let server
module.exports = {
  setMainMenu,
  SetPopMenu
};

function saveAs(mainWindow) {
  ipcMain.on("reciveThreeData", (event, arg) => {
    showSaveDialog(mainWindow, arg);
  });
}

function save(mainWindow) {
  ipcMain.on("extractThreeDataSave", (event, arg) => {
    saveState(arg, mainWindow);
  });
}

function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? "File" : app.getName(),
      submenu: [
        {
          label: "Open...",
          accelerator: isWindows ? "Ctrl+O" : "Cmd+O",
          click() {
            showOpenDialog(mainWindow);
          }
        },
        {
          label: isWindows ? "Exit" : `Quit ${app.getName()}`,
          accelerator: isWindows ? "Alt+F4" : "CmdOrCtrl+Q",
          click() {
            app.quit();
          }
        },
        {
          label: "Save",
          accelerator: isWindows ? "Ctrl+S" : "Cmd+S",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "extractThreeDataSave"
            });
            save(mainWindow);
          }
        },
        {
          label: "Save As...",
          accelerator: isWindows ? "Shift+Ctrl+S" : "Shift+Cmd+S",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "extractThreeData"
            });
            saveAs(mainWindow);
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function SetPopMenu(mainWindow, win) {
  const menu = new Menu();
  this.objNum = 0;
  menu.append(
    new MenuItem(
      {
        label: "Add To Group",
        submenu: [
          {
            label: "Box",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "box"
              });
            }
          },
          {
            label: "Sphere",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "sphere"
              });
            }
          },
          {
            label: "Plane",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "plane"
              });
            }
          },
          {
            label: "Cylinder",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "cylinder"
              });
            }
          },
          {
            label: "Cone",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "cone"
              });
            }
          },
          {
            label: "Ring",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "ring"
              });
            }
          },
          {
            label: "Circle",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "circle"
              });
            }
          },
          {
            type: "separator"
          },
          {
            label: "Sky",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "sky"
              });
            }
          },
          {
            type: "separator"
          },
          {
            label: "Ambient Light",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "ambient"
              });
            }
          },
          {
            label: "Directional Light",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "directional"
              });
            }
          },
          {
            label: "Hemisphere Light",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "hemisphere"
              });
            }
          },
          {
            label: "Spot Light",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "spot"
              });
            }
          },
          {
            label: "Point Light",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "point"
              });
            }
          },
          {
            type: "separator"
          },
          {
            label: "3D Object",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "3DModel"
              });
            }
          }
        ]
      },
    )
  );
  menu.append(
    new MenuItem(
      {
        type: "separator"
      }
    )
  )
  menu.append(
    new MenuItem(
      {
        label: "Rename",
      },
    )
  )
  menu.append(
    new MenuItem(
      {
        type: "separator"
      }
    )
  )
  menu.append(
    new MenuItem(
      {
        label: "Copy",
        click:function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "copyObj",
          });
        }
      },
    )
  )
  menu.append(
    new MenuItem(
      {
        label: "Paste",
        click:function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "pasteObj",
          });
        }
      },
    )
  )
  menu.append(
    new MenuItem(
      {
        type: "separator"
      }
    )
  )
  menu.append(
    new MenuItem(
      {
        label: "Delete",
        click:function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "deleteObj",
          });
        }
      },
    )
  )
  menu.append(
    new MenuItem(
      {
        type: "separator"
      }
    )
  )
  menu.append(
    new MenuItem(
      {
        label: "Add to animate",
        click:function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "animate",
          });
        }
      },
    )
  )
  mainWindow.on("context-menu", (e, params) => {
    menu.popup(win, params.x, params.y);
  });
  ipcMain.on("show-context-menu", (event, arg) => {
    this.objNum = arg["dataNo"];
    const win = BrowserWindow.fromWebContents(event.sender);
    menu.popup(win);
  });
  ipcMain.on("open-asset-modal", (event, arg) => {
    const location = arg;
    showAddDialog(mainWindow, location);
  });

  ipcMain.on("startlocal", (event, arg) => {
    const { location } = arg;
    const PORT = 9999;
    const indexFile = () => fs.readFileSync(location + "/index.html");
    const jsFile = () => fs.readFileSync(location + "/scripts/index.js");
    // html file
    expressapp.get("/", (req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.send(indexFile());
    });
    // js file
    expressapp.get("/scripts/index.js", (req, res) => {
      res.setHeader("Content-Type", "text/javascript");
      res.send(jsFile());
    });
    // asset file
    expressapp.use("/Assets", express.static(location + "/Assets"));
    // start local server
    (async () => {
      expressapp.listen(PORT, () =>
        console.log(`App listening on port ${PORT}!`)
      );
    })();
    let ip = "";
    var networkInterfaces = Object.values(os.networkInterfaces())
      .reduce((r, a) => {
        r = r.concat(a);
        return r;
      }, [])
      .filter(({ family, address }) => {
        return (
          family.toLowerCase().indexOf("v4") >= 0 && address !== "127.0.0.1"
        );
      })
      .map(({ address }) => address);
    ip = networkInterfaces.join(", ");
    mainWindow.webContents.send("ipcRenderer", { option: "updateIP", ip: ip });
  });

  ipcMain.on("stoplocal", () => {
    server.close();
  });

  ipcMain.on("addModel", (event, arg) => {
    const objPath = `${arg.title}/Assets/${arg.name}.obj`;
    const writer = fs.createWriteStream(objPath);
    console.log(arg.obj.resources);
    https.get(arg.obj.root.url, function(response) {
      const stream = response.pipe(writer);
      stream.on('complete', function() {
        console.log('Downloaded successfully');
      });
    });
    const mtlPath = `${arg.title}/Assets/${arg.name}.mtl`;
    const writer2 = fs.createWriteStream(mtlPath);
    https.get(arg.obj.resources[0].url, function(response) {
      response.pipe(writer2);
    });
  });
}
