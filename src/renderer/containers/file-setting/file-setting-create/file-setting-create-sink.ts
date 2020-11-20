import { ExcelSheetSourceSetting } from '@shared/models/file-process-setting';
import { runAsync } from '@shared/utils/runAsync';
import { sink, state, trigger } from 'react-redux-sink';
import * as XLSX from 'xlsx';

const xlsx = /([a-zA-Z0-9\s_\\.\-\(\):])+(.xlsx)$/;

@sink('file-setting-create')
export class FileSettingCreateSink {
  @state
  filePath?: string;

  @state
  fileType?: string;

  @state
  excel?: XLSX.WorkBook;

  @state
  excelSheetSourceSettings: { [key: string]: ExcelSheetSourceSetting } = {};

  clearFile() {
    this.filePath = undefined;
    this.fileType = undefined;
    this.excel = undefined;
  }

  @trigger('file-setting-create/filePath')
  async triggerFilePath(filePath: string) {
    if (xlsx.test(filePath)) {
      this.fileType = 'excel';
      this.excel = await runAsync(() => XLSX.readFile(filePath));
      console.log(this.excel);
    } else {
      this.clearFile();
    }
  }
}
