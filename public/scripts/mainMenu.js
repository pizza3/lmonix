const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require("electron");
const isWindows = process.platform === "win32";
const {
  showSaveDialog,
  showOpenDialog,
  showAddDialog,
  saveState
} = require("./dialog");

module.exports = {
  setMainMenu,
  SetPopMenu
};

function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? "File" : app.getName(),
      submenu: [
        {
          label: "About Lmonix",
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
        }
      ]
    },
    {
      label: "File",
      submenu: [
        { label: "New Project", accelerator: isWindows ? "Ctrl+N" : "Cmd+N" },
        { type: "separator" },
        {
          label: "Open Project",
          accelerator: isWindows ? "Ctrl+O" : "Cmd+O",
          click() {
            showOpenDialog(mainWindow);
          }
        },
        { type: "separator" },
        {
          label: "Save",
          accelerator: isWindows ? "Ctrl+S" : "Cmd+S",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "extractThreeDataSave"
            });
          }
        },
        {
          label: "Save As..",
          accelerator: isWindows ? "Shift+Ctrl+S" : "Shift+Cmd+S",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "extractThreeData"
            });
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
        { label: "Copy", 
          // accelerator: isWindows ? "Ctrl+C" : "Cmd+C" 
        },
        { label: "Paste", 
          // accelerator: isWindows ? "Ctrl+V" : "Cmd+V" 
        },
        { type: "separator" },
        {
          label: "Delete",
          accelerator: isWindows ? "Ctrl+D" : "Cmd+D",
          click: function() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "deleteObj"
            });
          }
        },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Design",
          accelerator: isWindows ? "Ctrl+1" : "Cmd+1",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "routeDesign"
            });
          }
        },
        {
          label: "Prototype",
          accelerator: isWindows ? "Ctrl+2" : "Cmd+2",
          click() {
            mainWindow.webContents.send("ipcRenderer", {
              option: "routePrototype"
            });
          }
        },
        { type: "separator" },
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
  menu.append(
    new MenuItem({
      label: "Add Child",
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
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Rename",
      click: function() {
        mainWindow.webContents.send("rename");
      }
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Copy",
      accelerator: isWindows ? "Ctrl+C" : "Cmd+C",
      click: function() {
        mainWindow.webContents.send("ipcRenderer", {
          option: "copyObj"
        });
      }
    })
  );
  menu.append(
    new MenuItem({
      label: "Paste",
      accelerator: isWindows ? "Ctrl+V" : "Cmd+V",
      click: function() {
        mainWindow.webContents.send("ipcRenderer", {
          option: "pasteObj"
        });
      }
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Delete",
      accelerator: isWindows ? "Ctrl+D" : "Cmd+D",
      click: function() {
        mainWindow.webContents.send("ipcRenderer", {
          option: "deleteObj"
        });
      }
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Add Animation",
      click: function() {
        mainWindow.webContents.send("ipcRenderer", {
          option: "animate"
        });
      }
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Add Snippet",
      submenu: [
        {
          label: "Cursor",
          submenu: [
            {
              label: "Click",
              click: function() {
                mainWindow.webContents.send("addSnippet", {
                  option: "click"
                });
              }
            },
            {
              label: "Mouse Enter",
              click: function() {
                mainWindow.webContents.send("addSnippet", {
                  option: "mouseenter"
                });
              }
            },
            {
              label: "Mouse Leave",
              click: function() {
                mainWindow.webContents.send("addSnippet", {
                  option: "mouseleave"
                });
              }
            }
          ]
        }
      ]
    })
  );
  ipcMain.on("show-context-menu", event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    menu.popup(win);
  });
  ipcMain.on("open-asset-modal", (event, arg) => {
    const location = arg;
    showAddDialog(mainWindow, location);
  });
  ipcMain.on("reciveThreeData", (event, arg) => {
    showSaveDialog(mainWindow, arg);
  });
  ipcMain.on("extractThreeDataSave", (event, arg) => {
    saveState(arg, mainWindow);
  });
}
