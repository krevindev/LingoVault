const { ipcRenderer, contextBridge } = require("electron");

// contextBridge.exposeInMainWorld("api", {
//   minimize: () => ipcRenderer.send("window-control", "minimize"),
//   maximize: () => ipcRenderer.send("window-control", "maximize"),
//   close: () => ipcRenderer.send("window-control", "close"),
// });

contextBridge.exposeInMainWorld("api", {
  windowControl: (action) => ipcRenderer.send("window-control", action),
  isFullScreen: () => ipcRenderer.invoke("get-fullscreen-status"),
});

// contextBridge.exposeInMainWorld('api', {
//   minimize: () => ipcRenderer.send('window-minimize'),
//   maximize: () => ipcRenderer.send('window-maximize'),
//   close: () => ipcRenderer.send('window-close'),
//   toggleFullScreen: () => ipcRenderer.send('window-toggle-fullscreen')
// });
