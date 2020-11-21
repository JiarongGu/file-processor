import { ExcelSourceService } from '@services/source/excel-source-service';
import { ExcelService } from '@services/excel/excel-service';
import { generateId } from '@shared';
import { FileType } from '@shared/models/file-process-setting';
import { SourceSetting } from '@shared/models/source';
import { ExcelSource } from '@shared/models/source/excel-source';
import { runAsync } from '@shared/utils/runAsync';
import { effect, sink, state, trigger } from 'react-redux-sink';
import * as XLSX from 'xlsx';
import { container } from 'tsyringe';

const xlsx = /([a-zA-Z0-9\s_\\.\-\(\):])+(.xlsx)$/;

@sink('source-create')
export class SourceCreateSink {
  @state
  filePath?: string;

  @state
  fileType?: string;

  @state
  excel?: XLSX.WorkBook;

  @state
  sources: { [key: string]: SourceSetting } = {};

  @state
  excelService: ExcelService = container.resolve(ExcelService);

  @state
  excelProcessService: ExcelSourceService = container.resolve(ExcelSourceService);

  clearFile() {
    this.filePath = undefined;
    this.fileType = undefined;
    this.excel = undefined;
  }

  @trigger('source-create/filePath')
  async triggerFilePath(filePath: string) {
    this.sources = {};

    if (xlsx.test(filePath)) {
      this.fileType = 'excel';
      this.excel = await this.excelService.read(filePath);
      this.addExcelSource();
    } else {
      this.clearFile();
    }
  }

  @effect
  addExcelSource() {
    const id = generateId();
    const setting: ExcelSource = {
      fields: [],
      outputs: [],
      category: FileType.Excel,
    };
    this.sources = { ...this.sources, [id]: setting };
    return setting;
  }

  @effect
  deleteSource(id: string) {
    delete this.sources[id];
    this.sources = { ...this.sources };
  }
}
