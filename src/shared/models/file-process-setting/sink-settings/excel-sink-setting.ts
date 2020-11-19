import { FileCategory } from '../file-category.enum';
import { FileProcessType } from '../file-process-type.enum';

export interface ExcelSinkSetting {
    id: string;
    name: string;
    process: FileProcessType.Sink;
    category: FileCategory.Excel;
  }