import { FileProcessSetting } from '@shared/models/file-process-setting';
import { FileProcessType } from '@shared/models/file-process-setting/file-process-type.enum';

export interface IFileProcessSettingRepository {
  list(processType?: FileProcessType): Promise<FileProcessSetting[]>;

  fetch(id: string, processType?: FileProcessType) : Promise<FileProcessSetting>;

  create(value: FileProcessSetting): Promise<FileProcessSetting>;

  update(value: FileProcessSetting): Promise<void>;

  delete(id: string): Promise<void>;
}