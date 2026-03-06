const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');

let carpetaSeleccionada = "";

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile('index.html');
  win.setMenu(null);
}

app.whenReady().then(createWindow);

// 📁 Selector de carpeta
ipcMain.handle('seleccionar-carpeta', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (!result.canceled) {
    carpetaSeleccionada = result.filePaths[0];
    return carpetaSeleccionada;
  }

  return null;
});

// 📂 Obtener carpeta actual
ipcMain.handle('obtener-carpeta', () => {
  return carpetaSeleccionada;
});