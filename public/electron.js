
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const {setMainMenu, SetPopMenu} = require('./mainMenu.js');

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

app.on('ready', ()=>{
  createWindow()
  // installExtension(installExtension.REACT_DEVELOPER_TOOLS)
  // .then((name) => console.log(`Added Extension:  ${name}`))
  // .catch((err) => console.log('An error occurred: ', err));
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
