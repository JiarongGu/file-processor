import { FileType } from '../../file/file-type.enum';
import { FileProcessType } from '../file-process-type.enum';

export interface ExcelSinkSetting {
  id: string;
  name: string;
  process: FileProcessType.Sink;
  category: FileType.Excel;
}
