import { FileProcessSettingType } from './file-process-setting-type.enum';

export interface CommonFileProcessSetting {
    id: string;
    name: string;
    type: FileProcessSettingType.Common;
    [option: string]: any;
  }
  