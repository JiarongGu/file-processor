import { inject, injectable } from 'tsyringe';

import { ExcelSourceService } from './excel-source-service';
import { ExcelSource, ExcelSourceField } from '@shared/models/source/excel-source';
import { FileType } from '@shared/models/file/file-type.enum';
import { ExcelProcessOption } from './excel-process-options';
import { RemoteService, RemoteServiceType } from '@shared/remote';
import { ISourceRepository } from '@shared/remote/source-repository';
import { SourceSetting } from '@shared/models/source';

import * as XLSX from 'xlsx';

@injectable()
export class SourceService {
  constructor(
    private excelSourceService: ExcelSourceService,
    @inject(RemoteServiceType.SourceRepository) private remoteService: RemoteService<ISourceRepository>
  ) {}

  process(settings: Array<ExcelSourceField>, type: FileType.Excel, options: ExcelProcessOption);
  process(settings: Array<ExcelSourceField>, type: FileType, options: any) {
    if (type === FileType.Excel) {
      return this.excelSourceService.process(settings, options);
    }
  }

  processFile(input: string, output: string, setting: ExcelSource, type: FileType) {
    if (type === FileType.Excel && setting.sheetName) {
      const workBook = XLSX.readFile(input);
      console.log(workBook);
      console.log(XLSX.utils.sheet_to_json(workBook.Sheets[setting.sheetName], { raw: false }));

      const outputData = this.process(setting.fields, FileType.Excel, { sheet: workBook.Sheets[setting.sheetName] });

      console.log(outputData);

      const outputFields = setting.fields.map((x) => x.output || x.name!);

      const newWorkBook = XLSX.utils.book_new();
      const workSheetData = outputData.map((row) => {
        return outputFields.map((field) => [row[field]?.toString()]);
      });
      const newWorkSheet = XLSX.utils.aoa_to_sheet([outputFields, ...workSheetData]);

      newWorkBook.SheetNames.push('Sheet1');
      newWorkBook.Sheets['Sheet1'] = newWorkSheet;

      const workSheetOutput = XLSX.writeFile(newWorkBook, output, { bookType: 'xlsx' });
    }
  }

  async save(id: string, setting: SourceSetting) {
    await this.remoteService.invoke('save', id, setting);
  }

  async list() {
    return await this.remoteService.invoke('list');
  }
}
