import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { RemoteServiceType } from '@shared/remote';
import { FileService } from './services';
import { FileProcessSettingRepository } from './repositories/file-process-setting-repository';

const createEventHandler = (service) => async (event: IpcMainInvokeEvent, method, args) => {
  return await service[method].apply(service, args);
}

export function createIpc() {
  ipcMain.handle(RemoteServiceType.File, createEventHandler(new FileService()));

  ipcMain.handle(RemoteServiceType.FileProcessSetting, createEventHandler(new FileProcessSettingRepository()));
}