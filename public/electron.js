const { protocol, app, BrowserWindow } = require('electron');
const electron_is_dev = require('electron-is-dev');

const path = require('path');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'file',
    privileges: {
      standard: true,
      bypassCSP: true,
      supportFetchAPI: true,
      allowServiceWorkers: true
    }
  }
]);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    title: 'SatisGraphtory',
    webPreferences: {
      allowEval: false // This is the key!
    }
  });

  // Remove menu bar
  mainWindow.removeMenu();
  // This is a workaround for electron#16521
  mainWindow.setMenuBarVisibility(true);

  // and load the index.html of the app.
  let startUrl = electron_is_dev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;
  // mainWindow.webContents.openDevTools();

  mainWindow.loadURL(startUrl);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
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
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
