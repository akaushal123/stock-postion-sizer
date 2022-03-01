const electron = require('electron');
const isDev = require('electron-is-dev');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const { autoUpdater } = require('electron-updater');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window;

function createWindow() {
    // Create the browser window.
    let display = electron.screen.getPrimaryDisplay();
    let {width, height} = display.bounds;
    try{
        window = new BrowserWindow({
            title: 'Stock Position Sizer',
            alwaysOnTop: true,
            icon: `${path.join(__dirname, './favicon.ico')}`,
            x: width - 300,
            y: height - 560,
            width: 280,
            height: 500,
            roundedCorners: true,
            resizable: false,
            transparent: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
    } catch (e) {
        console.error(e);
    }

    window.setMenuBarVisibility(false);
    window.setOpacity(45);

    require('@electron/remote/main').initialize();
    require("@electron/remote/main").enable(window.webContents);

    // and load the index.html of the app.
    let startUrl;
    if (isDev) {
        startUrl = 'http://localhost:3000';
        // Open the DevTools.
        window.webContents.openDevTools({mode: 'detach', activate: false});
    } else {
        startUrl = `file://${path.join(__dirname, '../build/index.html')}`;
    }
    window.loadURL(startUrl);

    // Emitted when the window is closed.
    window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null
    });

    window.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    setTimeout(createWindow, 300)
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

electron.ipcMain.on('app-version', (event) => {
    event.sender.send('app-version', { version: app.getVersion() });
});
electron.ipcMain.on('restart-app', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
});
