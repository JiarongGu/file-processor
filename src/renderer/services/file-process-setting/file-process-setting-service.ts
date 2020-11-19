import { FileProcessSetting } from '@shared/models/file-process-setting';
import { CommonFileProcessSetting } from '@shared/models/file-process-setting/common-file-process-setting';
import { ExcelFieldProcessSetting } from '@shared/models/file-process-setting/excel-process-setting';
import { FileProcessSettingType } from '@shared/models/file-process-setting/file-process-setting-type.enum';
import { IFileProcessSettingRepository, RemoteService, RemoteServiceType } from '@shared/remote';

export class FileProcessSettingService implements IFileProcessSettingRepository {
  private readonly _repository = new RemoteService<IFileProcessSettingRepository>(RemoteServiceType.FileProcessSetting);

  async list(type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting[]>;
  async list(type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting[]>;
  async list(): Promise<FileProcessSetting[]>;
  async list(type?: FileProcessSettingType) {
    return await this._repository.invoke('list', type);
  }

  async fetch(id: string, type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting>;
  async fetch(id: string, type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting>;
  async fetch(id: string): Promise<FileProcessSetting>;
  async fetch(id: string, type?: FileProcessSettingType): Promise<FileProcessSetting> {
    return await this._repository.invoke('fetch', id, type);
  }

  async create(value: CommonFileProcessSetting): Promise<CommonFileProcessSetting>;
  async create(value: ExcelFieldProcessSetting): Promise<ExcelFieldProcessSetting>;
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
