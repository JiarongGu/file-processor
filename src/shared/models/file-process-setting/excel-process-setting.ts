import { FileProcessSettingType } from './file-process-setting-type.enum';

export interface ExcelProcessSetting {
  id: string;
  name: string;
  type: FileProcessSettingType.Excel;
  sheets: ExcelSheetProcessSetting[];
}

export interface ExcelSheetProcessSetting {
  name: string;
  fields: ExcelFieldProcessSetting[];
}

export interface ExcelFieldProcessSetting {
  id: string;
  name: string;
  converter?: (input: string) => string
}
