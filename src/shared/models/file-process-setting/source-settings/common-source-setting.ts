import { FileProcessType } from '../file-process-type.enum';
import { FileCategory } from '../file-category.enum';

export interface CommonSourceSetting {
    id: string;
    name: string;
    process: FileProcessType.Source;
    category: FileCategory.Common;
    [option: string]: any;
  }
  