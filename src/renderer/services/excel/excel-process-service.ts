import { ExcelFieldConvertType, ExcelFieldSourceSetting } from '@shared/models/file-process-setting';
import * as XLSX from 'xlsx';
import { ExcelService } from './excel-service';

export class ExcelProcessService {
  excelService = new ExcelService();

  processSourceOutput(
    workSheet: XLSX.WorkSheet,
    settings: Array<ExcelFieldSourceSetting>,
    rowFrom: number,
    rowTo: number
  ) {
    const metadata = this.excelService
      .readRow(workSheet, 1)
      .reduce((p, c, i) => ((p[c] = i), p), {} as { [key: string]: number });
    const rowCount = this.excelService.countRow(workSheet);
    const maxRow = rowTo < rowCount ? rowTo : rowCount;
    const processed: Array<{ [key: string]: string }> = [];
    const errors: Array<string> = [];

    for (let i = rowFrom; i <= maxRow; i++) {
      const row = this.excelService.readRow(workSheet, i);
      const output: { [key: string]: string } = {};
      for (const setting of settings) {
        if (setting.name) {
          const value = row[metadata[setting.name]];
          const outputName = setting.output ?? setting.name;

          switch (setting.converter.type) {
            case ExcelFieldConvertType.None:
              output[outputName] = value;
            case ExcelFieldConvertType.Script:
              if (setting.converter.value) {
                // tslint:disable-next-line: no-function-constructor-with-string-args
                const scriptConvertor = new Function(`return ${setting.converter.value}`);
                try {
                  output[outputName] = scriptConvertor()(value, processed);
                } catch {
                  errors.push(`convert error: ${setting.name} -> ${outputName}`);
                }
              }
          }
        }
      }
      processed.push(output);
    }
    return processed;
  }
}
