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


function setMainMenu(mainWindow,isDev) {
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
        { label: "Undo",
          accelerator: isWindows ? "Ctrl+Z" : "Cmd+Z",
          click(){
            mainWindow.webContents.send("ipcRenderer", {
              option: "undoState"
            });
          } },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { type: "separator" },
        {
          label: "Delete",
          accelerator: isWindows ? "Ctrl+D" : "Cmd+backspace",
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
        ...isDev?[
          { role: "reload" },
          { role: "forcereload" },
          { role: "toggledevtools" },
          { type: "separator" },
        ]:[],
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

function SetPopMenu(mainWindow) {
  ipcMain.on("show-context-menu", (event,args) => {
    const { type, primitive} = args
    const subMenuMesh = [
      {
        label: "Fade In",
        click: function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "animate",
            type:'fadeIn'
          });
        }
      },
      {
        label: "Fade Out",
        click: function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "animate",
            type:'fadeOut'
          });
        }
      },
      {
        label: "Color",
        click: function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "animate",
            type:'color'
          });
        }
      },
    ]

    const subMenuLight = [
      {
        label: "Intensity",
        click: function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "animate",
            type:'intensity'
          });
        }
      },
    ]
    const win = BrowserWindow.fromWebContents(event.sender);
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
            label: "Curved Image",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "addGroupObj",
                obj: "curvedimage"
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
        label: "Copy Entity",
        // accelerator: isWindows ? "Ctrl+C" : "Cmd+C",
        click: function() {
          mainWindow.webContents.send("ipcRenderer", {
            option: "copyObj"
          });
        }
      })
    );
    menu.append(
      new MenuItem({
        label: "Paste Entity",
        // accelerator: isWindows ? "Ctrl+V" : "Cmd+V",
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
        accelerator: isWindows ? "Ctrl+D" : "Cmd+backspace",
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
        submenu: [
          {
            label: "Position",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "animate",
                type:'position'
              });
            }
          },
          {
            label: "Rotation",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "animate",
                type:'rotation'
              });
            }
          },
          {
            label: "Scale",
            click: function() {
              mainWindow.webContents.send("ipcRenderer", {
                option: "animate",
                type:'scale'
              });
            }
          },
          ...type==='Mesh'&&primitive!=='3DModel'?subMenuMesh:type==='Light'?subMenuLight:[]
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
          },
          {
            label:'Object',
            click: function() {
              mainWindow.webContents.send("addSnippet", {
                option: "entityObject"
              });
            }
          },
          {
            label:'Emit',
            click: function() {
              mainWindow.webContents.send("addSnippet", {
                option: "entityEmit"
              });
            }
          },
          {
            label:'Set Attribute',
            submenu:[
              {
                label:'Position',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "setAttribute",
                    property: "position"
                  });
                }
              },
              {
                label:'Rotation',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "setAttribute",
                    property: "rotation"
                  });
                }
              },
              {
                label:'Scale',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "setAttribute",
                    property: "scale"
                  });
                }
              },
              {
                label:'setAttribute()',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "setAttribute",
                  });
                }
              }
            ]
          },
          {
            label:'Get Attribute',
            submenu:[
              {
                label:'Position',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "getAttribute",
                    property: "position"
                  });
                }
              },
              {
                label:'Rotation',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "getAttribute",
                    property: "rotation"
                  });
                }
              },
              {
                label:'Scale',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "getAttribute",
                    property: "scale"
                  });
                }
              },
              {
                label:'getAttribute()',
                click: function() {
                  mainWindow.webContents.send("addSnippet", {
                    option: "getAttribute",
                  });
                }
              }
            ]
          }
        ]
      })
    );
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
