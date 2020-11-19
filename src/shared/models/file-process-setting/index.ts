import { ExcelSinkSetting } from './sink-settings/excel-sink-setting';
import { CommonSourceSetting } from './source-settings/common-source-setting';
import { ExcelSourceSetting } from './source-settings/excel-source-setting';

export * from './file-category.enum';
export * from './source-settings/common-source-setting';
export * from './source-settings/excel-source-setting';
export * from './file-process-type.enum';

export type FileSourceSetting = CommonSourceSetting | ExcelSourceSetting;

export type FileSinkSetting = ExcelSinkSetting;

export type FileProcessSetting = FileSourceSetting | FileSinkSetting;