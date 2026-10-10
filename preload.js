const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('tracker', {
  loadToday: () => ipcRenderer.invoke('load'),
  saveLog: (log) => ipcRenderer.invoke('save', log)
});