const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const dataFile = () => path.join(app.getPath('userData'), 'daytrack.json');
const today = () => new Date().toISOString().split('T')[0];
const readAll = () => { try { return JSON.parse(fs.readFileSync(dataFile())); } catch { return {}; } };

ipcMain.handle('load', () => readAll()[today()] || null);
ipcMain.handle('save', (_, log) => {
  const all = readAll(); all[log.date || today()] = log;
  fs.writeFileSync(dataFile(), JSON.stringify(all, null, 2));
});

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1200, height: 800, backgroundColor: '#0a0a12',
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  win.loadFile('index.html');
});