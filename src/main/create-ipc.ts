import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { RemoteServiceType } from '@shared/remote';
import { FileService } from './services';
import { FileProcessSettingRepository } from './repositories/file-process-setting-repository';
import { container } from 'tsyringe';
import { SourceRepository } from './repositories/source-repository';

const createEventHandler = (service) => async (event: IpcMainInvokeEvent, method, args) => {
  return await service[method].apply(service, args);
};

export function createIpc() {
  ipcMain.handle(RemoteServiceType.File, createEventHandler(container.resolve(FileService)));

  ipcMain.handle(RemoteServiceType.SOURCE_REPOSITORY, createEventHandler(container.resolve(SourceRepository)));

  ipcMain.handle(RemoteServiceType.FileProcessSetting, createEventHandler(new FileProcessSettingRepository()));
}
