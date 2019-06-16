const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require("electron");
const isWindows = process.platform === "win32";
const {
  showSaveDialog,
  showOpenDialog,
  showAddDialog,
  saveState
} = require("./dialog");
const http = require("http");
const https = require("https");
const fs = require("fs");
const os = require("os");
const express = require("express")();

let localServer;
module.exports = {
  setMainMenu,
  SetPopMenu
};

function saveAs(mainWindow) {
  ipcMain.on("reciveThreeData", (event, arg) => {
    showSaveDialog(mainWindow, arg);
  });
}

function save(params) {
  ipcMain.on("reciveThreeData", (event, arg) => {
    saveState(arg);
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
              option: "extractThreeData"
            });
            save();
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
    new MenuItem({
      label: "Add To Group",
      submenu: [
        {
          label: "Cube",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
            });
          }
        },
        {
          label: "Sphere",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
            });
          }
        },
        {
          type: "separator"
        },
        {
          label: "Surface",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
            });
          }
        },
        {
          label: "Sky",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
            });
          }
        },
        {
          type: "separator"
        },
        {
          label: "Point Light",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
            });
          }
        },
        {
          label: "Spot Light",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "addGroupObj",
              obj: "cube"
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
              obj: "cube"
            });
          }
        }
      ]
    })
  );
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
    // BrowserWindow.webContents.send("ipcRenderer",{option:"getLocation"});
    showAddDialog(mainWindow, location);
  });

  ipcMain.on("startlocal", (event, arg) => {
    const { location } = arg;
    const PORT = 9999;
    console.log(location);
    fs.readFile(`${location}/index.html`, function(err, html) {
      if (err) throw err;

    //   localServer = http
    //     .createServer(function(request, response) {
    //       response.writeHeader(200);
    //       response.write(html);
    //       response.end();
    //     })
    //     .listen(PORT);

    express.get('/', function(req,res){
        res.sendFile(`${location}/`)
     });
     express.listen(9999);
    });
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

  ipcMain.on("stoplocal", (event, arg) => {
    localServer.close();
  });

  ipcMain.on("addModel", (event, arg) => {
    // localServer.close()
    const path = `${arg.title}/Assets/${arg.name}.obj`;
    const writer = fs.createWriteStream(path);
    // let fileArr = [];
    https.get(arg.obj.root.url, function(response) {
      response.pipe(writer);
    });
    const path2 = `${arg.title}/Assets/${arg.name}.mtl`;
    const writer2 = fs.createWriteStream(path2);
    https.get(arg.obj.resources[0].url, function(response) {
      response.pipe(writer2);
    });
  });
}
