import { ExcelSourceService } from '@services/source/excel-source-service';
import { ExcelService } from '@services/excel/excel-service';
import { generateId } from '@shared';
import { FileType } from '@shared/models/file-process-setting';
import { SourceSetting } from '@shared/models/source';
import { ExcelFieldConvertorType, ExcelSource } from '@shared/models/source/excel-source';
import { effect, sink, state, trigger } from 'react-redux-sink';
import * as XLSX from 'xlsx';
import { container } from 'tsyringe';
import { SourceService } from '@services/source/source-service';

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
  sources: { [key: string]: ExcelSource } = {};

  @state
  excelService: ExcelService = container.resolve(ExcelService);

  @state
  excelProcessService: ExcelSourceService = container.resolve(ExcelSourceService);

  @state
  sourceService: SourceService = container.resolve(SourceService);

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

  @effect
  saveSource(id: string) {
    const setting = this.sources[id];
    if (setting) {
      this.sourceService.save(id, setting);
    }
  }

  @effect
  addSourceField(id: string) {
    const source = this.sources[id];
    if (source) {
      source.fields.push({
        converter: { type: ExcelFieldConvertorType.None },
      });
      this.sources = { ...this.sources, [id]: source };
    }
  }

  @effect
  deleteSourceField(id: string, fieldId: number) {
    const source = this.sources[id];
    if (source) {
      source.fields.splice(fieldId, 1);
      this.sources = { ...this.sources, [id]: source };
    }
  }

  @effect
  clearSourceField(id: string) {
    const source = this.sources[id];
    if (source) {
      source.fields = [];
      this.sources = { ...this.sources, [id]: source };
    }
  }
}
