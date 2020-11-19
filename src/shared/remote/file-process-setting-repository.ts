import { FileProcessSetting } from '@shared/models/file-process-setting';
import { FileProcessSettingType } from '@shared/models/file-process-setting/file-process-setting-type.enum';

export interface IFileProcessSettingRepository {
  list(type?: FileProcessSettingType): Promise<FileProcessSetting[]>;

  fetch(id: string, type?: FileProcessSettingType) : Promise<FileProcessSetting>;

  create(value: FileProcessSetting): Promise<FileProcessSetting>;

  update(value: FileProcessSetting): Promise<void>;

  delete(id: string): Promise<void>;
}