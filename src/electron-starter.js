const electron = require('electron');
// Modules to control app life, native browser window, and ipc.
const {app, BrowserWindow, ipcMain} = electron;


const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let windowVariables = {
  width: 800,
  height: 600,
  minWidth: 575,
  minHeight: 425,
  show: false,
  titleBarStyle: "hidden",
  frame: false,
  transparent: true
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({...windowVariables, webPreferences: {nodeIntegrationInWorker: true}});

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:3000`);

  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show',()=>{
    mainWindow.show();
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Setup drag listeners
ipcMain.on('onFileAdded', (e, args) => {
  console.log("received transmission:" + args);
});