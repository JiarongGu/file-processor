import { BrowserWindow } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as path from 'path';
import * as url from 'url';

const installExtensions = async () => {
  const extensions = [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS];
  return Promise.all(extensions.map((name) => installExtension(name))).catch(console.log);
};

export const createRenderer = (onCreate: (win: BrowserWindow) => void, onClose: () => void) => async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
    win.setMenu(null);
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }
  onCreate(win);
  win.on('closed', onClose);
};
