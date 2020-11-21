import { ExcelProcessService } from '@services/excel/excel-process-service';
import { ExcelService } from '@services/excel/excel-service';
import { generateId } from '@shared';
import { ExcelSourceSetting, FileCategory, FileProcessType } from '@shared/models/file-process-setting';
import { runAsync } from '@shared/utils/runAsync';
import { effect, sink, state, trigger } from 'react-redux-sink';
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
  excelSourceSettings: { [key: string]: ExcelSourceSetting } = {};

  @state
  excelService: ExcelService = new ExcelService();

  @state
  excelProcessService: ExcelProcessService = new ExcelProcessService();

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
      this.excelSourceSettings = {};
      this.addExcelSourceSetting();
      console.log(this.excel);
    } else {
      this.clearFile();
    }
  }

  @effect
  addExcelSourceSetting() {
    const id = generateId();
    const setting: ExcelSourceSetting = {
      id: id,
      fields: [],
      outputs: [],
      category: FileCategory.Excel,
      process: FileProcessType.Source,
    };
    this.excelSourceSettings = { ...this.excelSourceSettings, [id]: setting };
    return setting;
  }

  @effect
  deleteExcelSourceSetting(id: string) {
    delete this.excelSourceSettings[id];
    this.excelSourceSettings = { ...this.excelSourceSettings };
  }
}
