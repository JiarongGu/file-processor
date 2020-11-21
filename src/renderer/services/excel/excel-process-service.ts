import { ExcelFieldConvertType, ExcelFieldSourceSetting } from '@shared/models/file-process-setting';
import * as XLSX from 'xlsx';
import { ExcelService } from './excel-service';

export class ExcelProcessService {
  excelService = new ExcelService();

  processSourceOutput(workSheet: XLSX.WorkSheet, settings: ExcelFieldSourceSetting[], rowFrom: number, rowTo: number) {
    console.log(workSheet);

    const metadata = this.excelService
      .readRow(workSheet, 1)
      .reduce((p, c, i) => ((p[c] = i), p), {} as { [key: string]: number });

    const processed: { [key: string]: string }[] = [];
    const errors: string[] = [];

    for (let i = rowFrom; i <= rowTo; i++) {
      const row = this.excelService.readRow(workSheet, i);
      const output: { [key: string]: string } = {};
      for (let setting of settings) {
        if (setting.name && setting.output) {
          const value = row[metadata[setting.name]];

          switch (setting.converter.type) {
            case ExcelFieldConvertType.None:
              output[setting.output] = value;
            case ExcelFieldConvertType.Script:
              if (setting.converter.value) {
                const scriptConvertor = new Function(`return ${setting.converter.value}`);
                try {
                  output[setting.output] = scriptConvertor()(value, processed);
                } catch {
                  errors.push(`convert error: ${setting.name} -> ${setting.output}`);
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
