
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const { systemPreferences } = require('electron')
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = isDev?require('electron-devtools-installer'):{};
const path = require('path');
const {setMainMenu, SetPopMenu} = require('./mainMenu.js');
let mainWindow;

function createWindow(event, win) {
  mainWindow = new BrowserWindow({
  width: 1300, 
  height: 700,
  titleBarStyle: "hiddenInset",
  nodeIntegration: true,
});
  mainWindow.loadURL(isDev ? 'http://localhost:3006/' : `file://${path.join(__dirname, '../build/index.html/')}`);
  mainWindow.on('closed', () => mainWindow = null);
  setMainMenu(mainWindow);
  SetPopMenu(mainWindow,win)
}
// const installExtensions = async () => {
//   return installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));
// };


app.on('ready', async ()=>{
    createWindow()
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
