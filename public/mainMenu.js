const {app, BrowserWindow, Menu, ipcMain, MenuItem} =  require('electron');
const isWindows = process.platform === 'win32';
const {showSaveDialog, showOpenDialog, showAddDialog, saveState} = require('./dialog');
const http = require('http');
const fs = require('fs');

module.exports = {
    setMainMenu,
    SetPopMenu
}

function saveAs(mainWindow) {
    ipcMain.on("reciveThreeData", (event,arg) => {
        showSaveDialog(mainWindow,arg)
    });
}

function save(params) {
    ipcMain.on("reciveThreeData", (event,arg) => {
        console.log('arg',arg);
        saveState(arg)
    });
}

function setMainMenu(mainWindow) {
    const template = [
        {
            label: isWindows ? 'File' : app.getName(),
            submenu:[
                {
                    label:'Open...',
                    accelerator:isWindows?'Ctrl+O':'Cmd+O',
                    click(){
                        showOpenDialog(mainWindow)
                    }
                },
                {
                    label:isWindows? 'Exit': `Quit ${app.getName()}`,
                    accelerator:isWindows?'Alt+F4':'CmdOrCtrl+Q',
                    click(){
                        app.quit()
                    }
                },
                {
                  label:'Save',
                  accelerator:isWindows?'Ctrl+S':'Cmd+S',
                  click(){
                        mainWindow.webContents.send("ipcRenderer",{option:"extractThreeData"});   
                        save()
                  }
                },
                {
                    label:'Save As...',
                    accelerator:isWindows?'Shift+Ctrl+S':'Shift+Cmd+S',
                    click(){
                        mainWindow.webContents.send("ipcRenderer",{option:"extractThreeData"});   
                        saveAs(mainWindow);
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { type: 'separator' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'pasteandmatchstyle' },
              { role: 'delete' },
              { role: 'selectall' }
            ]
          },
          {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              { role: 'toggledevtools' },
              { type: 'separator' },
              { role: 'resetzoom' },
              { role: 'zoomin' },
              { role: 'zoomout' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ]
          },
          {
            role: 'window',
            submenu: [
              { role: 'minimize' },
              { role: 'close' }
            ]
          },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function SetPopMenu(mainWindow, win){
    const menu = new Menu();
    this.objNum = 0;
    menu.append(
        new MenuItem({
            label: "Add To Group",
            submenu: [
                {
                    label: "Cube",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    label: "Sphere",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Surface",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    label: "Sky",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Point Light",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    label: "Spot Light",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "3D Object",
                    click: function() {
                        mainWindow.webContents.send("ipcRenderer",{option:"addGroupObj", obj:'cube'});                        
                    }
                }
            ]
        })
    );
    mainWindow.on("context-menu", (e, params) => {
		menu.popup(win, params.x, params.y);
    });
    ipcMain.on("show-context-menu", (event,arg) => {
        this.objNum = arg['dataNo'];
        const win = BrowserWindow.fromWebContents(event.sender);
        menu.popup(win);
    });
    ipcMain.on("open-asset-modal",(event, arg)=>{
        const location = arg
        // BrowserWindow.webContents.send("ipcRenderer",{option:"getLocation"});
        showAddDialog(mainWindow,location)
    })

    ipcMain.on("startlocal",(event, arg)=>{
        const {location} = arg
        // BrowserWindow.webContents.send("ipcRenderer",{option:"getLocation"});
        const PORT=9999; 
        fs.readFile(`${location}/index.html`, function (err, html) {

            if (err) throw err;    

            http.createServer(function(request, response) {  
                response.writeHeader(200, {"Content-Type": "text/html"});  
                response.write(html);  
                response.end();  
            }).listen(PORT);
        });
    })
}