const electron = require('electron');
const isDev = require('electron-is-dev');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window, onTop = true;

function createWindow() {
    // Create the browser window.
    let display = electron.screen.getPrimaryDisplay();
    let {width, height} = display.bounds;

    window = new BrowserWindow({
        title: 'Stock Position Sizer',
        type: 'toolbar',
        alwaysOnTop: onTop,
        icon: `${path.join(__dirname, '../../public/favicon.ico')}`,
        x: width - 320,
        y: height - 540,
        width: 300,
        height: 555,
        roundedCorners: true,
        resizable: false,
        transparent: true,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + './preload.js'
        }
    });

    window.setMenuBarVisibility(false);
    window.setOpacity(45);

    // and load the index.html of the app.
    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    window.loadURL(startUrl);

    // Open the DevTools.
    window.webContents.openDevTools({mode: 'detach', activate: false});

    // Emitted when the window is closed.
    window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null
    })
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
