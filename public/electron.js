
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = isDev?require('electron-devtools-installer'):{};
const path = require('path');
const {setMainMenu, SetPopMenu} = require('./mainMenu.js');
let mainWindow;

function createWindow(event, win) {
  mainWindow = new BrowserWindow({
  width: 1300, 
  height: 700,
  titleBarStyle: "hiddenInset",
  nodeIntegration: false,
});
  mainWindow.loadURL(isDev ? 'http://localhost:3006/design' : `file://${path.join(__dirname, '../build/index.html/design')}`);
  mainWindow.on('closed', () => mainWindow = null);
  setMainMenu(mainWindow);
  let menu = SetPopMenu(mainWindow,win)
  // mainWindow.on("context-menu", (e, params) => {
  //   menu.popup(win, params.x, params.y);
  // });
  // ipcMain.on("show-context-menu", (event, arg) => {
  //   // this.objNum = arg["dataNo"];
  //   const win = BrowserWindow.fromWebContents(event.sender);
  //   menu.popup(win);
  // });
}
// const installExtensions = async () => {
//   return installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));
// };


app.on('ready', async ()=>{
    // if(!isDev){
    //   await installExtensions();
    // }
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
