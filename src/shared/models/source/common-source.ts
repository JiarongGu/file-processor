import { FileProcessType } from '../file-process-setting/file-process-type.enum';
import { FileType } from '../file/file-type.enum';

export interface CommonSource {
  name: string;
  process: FileProcessType.Source;
  category: FileType.Common;
  [option: string]: any;
}
