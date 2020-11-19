import { FileProcessSetting } from '@shared/models/file-process-setting';
import { CommonFileProcessSetting } from '@shared/models/file-process-setting/common-file-process-setting';
import { ExcelFieldProcessSetting } from '@shared/models/file-process-setting/excel-process-setting';
import { FileProcessSettingType } from '@shared/models/file-process-setting/file-process-setting-type.enum';

export interface IFileProcessSettingRepository {
  list(type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting[]>;
  list(type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting[]>;
  list(): Promise<FileProcessSetting[]>;
  list(type?: FileProcessSettingType): Promise<FileProcessSetting[]>;

  fetch(id: string, type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting>;
  fetch(id: string, type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting>;
  fetch(id: string): Promise<FileProcessSetting>;
  fetch(id: string, type?: FileProcessSettingType) : Promise<FileProcessSetting>;

  create(value: CommonFileProcessSetting): Promise<CommonFileProcessSetting>;
  create(value: ExcelFieldProcessSetting): Promise<ExcelFieldProcessSetting>;
  create(value: FileProcessSetting): Promise<FileProcessSetting>;

  update(value: FileProcessSetting): Promise<void>;

  delete(id: string): Promise<void>;
}