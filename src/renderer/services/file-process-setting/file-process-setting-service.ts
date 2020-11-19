import {
  CommonSourceSetting,
  ExcelSourceSetting,
  FileProcessSetting,
  FileProcessType,
  FileSinkSetting,
  FileSourceSetting,
} from '@shared/models/file-process-setting';
import { ExcelSinkSetting } from '@shared/models/file-process-setting/sink-settings/excel-sink-setting';
import { IFileProcessSettingRepository, RemoteService, RemoteServiceType } from '@shared/remote';

export class FileProcessSettingService implements IFileProcessSettingRepository {
  private readonly _repository = new RemoteService<IFileProcessSettingRepository>(RemoteServiceType.FileProcessSetting);

  async list(process: FileProcessType.Sink): Promise<FileSinkSetting[]>;
  async list(process: FileProcessType.Source): Promise<FileSourceSetting[]>;
  async list(): Promise<FileProcessSetting[]>;
  async list(process?: FileProcessType) {
    return await this._repository.invoke('list', process);
  }

  async fetch(id: string, process: FileProcessType.Sink): Promise<FileSinkSetting>;
  async fetch(id: string, process: FileProcessType.Source): Promise<FileSourceSetting>;
  async fetch(id: string): Promise<FileProcessSetting>;
  async fetch(id: string, process?: FileProcessType): Promise<FileProcessSetting> {
    return await this._repository.invoke('fetch', id, process);
  }

  async create(value: CommonSourceSetting): Promise<CommonSourceSetting>;
  async create(value: ExcelSourceSetting): Promise<ExcelSourceSetting>;
  async create(value: ExcelSinkSetting): Promise<ExcelSinkSetting>;
  async create(value: FileProcessSetting): Promise<FileProcessSetting> {
    return await this._repository.invoke('create', value);
  }

  async update(value: FileProcessSetting): Promise<void> {
    return await this._repository.invoke('update', value);
  }

  async delete(id: string): Promise<void> {
    return await this._repository.invoke('delete', id);
  }
}
