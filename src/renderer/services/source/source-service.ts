import { injectable } from 'tsyringe';

import { ExcelSourceService } from './excel-source-service';
import { ExcelSourceField } from '@shared/models/source/excel-source';
import { FileType } from '@shared/models/file/file-type.enum';
import { ExcelProcessOption } from './excel-process-options';

@injectable()
export class SourceService {
  constructor(private excelSourceService: ExcelSourceService) {}

  process(settings: Array<ExcelSourceField>, type: FileType.Excel, options: ExcelProcessOption);
  process(settings: Array<ExcelSourceField>, type: FileType, options: any) {
    if (type === FileType.Excel) {
      return this.excelSourceService.process(settings, options);
    }
  }
}
