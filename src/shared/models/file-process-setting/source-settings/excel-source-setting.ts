import { FileProcessType } from '../file-process-type.enum';
import { FileCategory } from '../file-category.enum';

export interface ExcelSourceSetting {
  id: string;
  name: string;
  process: FileProcessType.Source;
  category: FileCategory.Excel;
  sheets: ExcelSheetSourceSetting[];
}

export interface ExcelSheetSourceSetting {
  name: string;
  fields: ExcelFieldSourceSetting[];
}

export interface ExcelFieldSourceSetting {
  id: string;
  name: string;
  converter: {
    order?: number;
    match?: string;
    convert: string;
  }
}
