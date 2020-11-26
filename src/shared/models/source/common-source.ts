import { FileProcessType } from '../file-process-setting/file-process-type.enum';
import { FileType } from '../file/file-type.enum';

export interface CommonSource {
  name: string;
  fileType: FileType.Common;
  fields: any[];
  [option: string]: any;
}
