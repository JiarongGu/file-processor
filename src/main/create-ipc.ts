import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { RemoteServiceType } from '@shared/remote';
import { FileService } from './services';
import { container } from 'tsyringe';
import { SourceRepository } from './repositories/source-repository';
import { SinkRepository } from './repositories/sink-repository';

const createEventHandler = (service) => async (event: IpcMainInvokeEvent, method, args) => {
  return await service[method].apply(service, args);
};

export function createIpc() {
  ipcMain.handle(RemoteServiceType.File, createEventHandler(container.resolve(FileService)));

  ipcMain.handle(RemoteServiceType.SourceRepository, createEventHandler(container.resolve(SourceRepository)));

  ipcMain.handle(RemoteServiceType.SinkRepository, createEventHandler(container.resolve(SinkRepository)));

  // ipcMain.handle(RemoteServiceType.FileProcessSetting, createEventHandler(new FileProcessSettingRepository()));
}
