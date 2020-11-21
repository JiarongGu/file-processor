import { FileType } from '../file/file-type.enum';

export interface ExcelSource {
  name?: string;
  category: FileType.Excel;
  outputs: Array<string>;
  fields: Array<ExcelSourceField>;
  sheetName?: string;
}

export enum ExcelFieldConvertorType {
  None = 'NONE',
  Script = 'SCRIPT',
  Regex = 'REGEX',
}

export interface ExcelSourceField {
  name?: string;
  output?: string;
  order?: number;
  converter: {
    type: ExcelFieldConvertorType;
    value?: string;
  };
}
