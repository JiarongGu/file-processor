import { FileProcessType } from '../file-process-type.enum';
import { FileCategory } from '../file-category.enum';

export interface ExcelSourceSetting {
  id: string;
  name?: string;
  process: FileProcessType.Source;
  category: FileCategory.Excel;
  outputs: Array<string>;
  fields: Array<ExcelFieldSourceSetting>;
  sheetName?: string;
}

export enum ExcelFieldConvertType {
  None = 'NONE',
  Script = 'SCRIPT',
  Regex = 'REGEX',
}

export interface ExcelFieldSourceSetting {
  name?: string;
  output?: string;
  order?: number;
  converter: {
    type: ExcelFieldConvertType;
    value?: string;
  };
}
