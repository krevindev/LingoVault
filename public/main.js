const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

require("@electron/remote/main").initialize();

let win;

// const isDev = process.env.NODE_ENV === "development";
const isDev = true;

function createWindow() {
  // Create the browser window

  win = new BrowserWindow({
    width: 600,
    height: 600,
    minWidth: 500,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      webSecurity: false,
    },
    frame: false,
    center: true,
  });

  Menu.setApplicationMenu(null);
  // win.loadFile(path.join(__dirname, "build", "index.html")); // Load the React build

  // win.loadURL("http://localhost:3000");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // const startURL =
  //   process.env.ELECTRON_START_URL ||
  //   `file://${path.join(__dirname, "/index.html")}`;

  // win.loadURL(startURL);

  // win.webContents.openDevTools();

  // win.webContents.session.clearCache(() => {
  //   win.loadURL('file://' + path.join(__dirname, '../build/index.html'));
  // });
  // win.webContents.openDevTools();
}

ipcMain.on("window-control", (event, action) => {
  if (win) {
    switch (action) {
      case "minimize":
        win.minimize();
        break;
      case "maximize":
        win.isMaximized() ? win.restore() : win.maximize();
        break;
      case "close":
        win.close();
        break;
      case "toggle-fullscreen":
        win.setFullScreen(!win.isFullScreen());
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  win.on("enter-full-screen", () => {
    win.webContents.send("fullscreen-status", true);
  });

  win.on("leave-full-screen", () => {
    win.webContents.send("fullscreen-status", false);
  });
});

ipcMain.handle("get-fullscreen-status", () => win.isFullScreen());

// app.on("ready", createWindow);
app.whenReady().then(() => createWindow());

// Quit when all windows are close
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no othe windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
