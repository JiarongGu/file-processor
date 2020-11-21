import { injectable } from 'tsyringe';

import { ExcelFieldConvertorType, ExcelSourceField } from '@shared/models/source/excel-source';
import { ExcelService } from '../excel/excel-service';
import { ExcelProcessOption } from './excel-process-options';

@injectable()
export class ExcelSourceService {
  constructor(private excelService: ExcelService) {}

  process(settings: Array<ExcelSourceField>, options: ExcelProcessOption) {
    const metadata = this.excelService
      .readRow(options.sheet, 1)
      .reduce((p, c, i) => ((p[c] = i), p), {} as { [key: string]: number });

    const rowCount = this.excelService.countRow(options.sheet);
    const rowFrom = options.from ?? 2;
    const rowTo = options.to < rowCount ? options.to : rowCount ?? rowCount;

    const processed: Array<{ [key: string]: string }> = [];
    const errors: Array<string> = [];

    for (let i = rowFrom; i <= rowTo; i++) {
      const row = this.excelService.readRow(options.sheet, i);
      const output: { [key: string]: string } = {};
      for (const setting of settings) {
        if (setting.name) {
          const value = row[metadata[setting.name]];
          const outputName = setting.output ?? setting.name;

          switch (setting.converter.type) {
            case ExcelFieldConvertorType.None:
              output[outputName] = value;
            case ExcelFieldConvertorType.Script:
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
