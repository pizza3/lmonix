
const electron = require('electron');
const app = electron.app;
const protocol = electron.protocol;
const BrowserWindow = electron.BrowserWindow;
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const path = require('path');
const isDev = require('electron-is-dev');
const {setMainMenu, SetPopMenu} = require('./mainMenu.js');
const http = require('http');
const fs = require('fs');

let mainWindow;

function createWindow(event, win) {
  mainWindow = new BrowserWindow({
  width: 900, 
  height: 680,
  titleBarStyle: "hiddenInset",
  nodeIntegration: false
});
  mainWindow.loadURL(isDev ? 'http://localhost:3006' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  setMainMenu(mainWindow);
  SetPopMenu(mainWindow,win)
}
const installExtensions = async () => {
  return installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};


app.on('ready', async ()=>{
    await installExtensions();
    createWindow()
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
