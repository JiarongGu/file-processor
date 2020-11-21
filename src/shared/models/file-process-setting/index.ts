import { ExcelSinkSetting } from './sink-settings/excel-sink-setting';

export * from '../file/file-type.enum';
export * from '../source/common-source';
export * from './file-process-type.enum';

export type FileSinkSetting = ExcelSinkSetting;

export type FileProcessSetting = FileSinkSetting;
