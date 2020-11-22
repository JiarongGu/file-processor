import { inject, injectable } from 'tsyringe';

import { ExcelSourceService } from './excel-source-service';
import { ExcelSourceField } from '@shared/models/source/excel-source';
import { FileType } from '@shared/models/file/file-type.enum';
import { ExcelProcessOption } from './excel-process-options';
import { RemoteService, RemoteServiceType } from '@shared/remote';
import { ISourceRepository } from '@shared/remote/source-repository';
import { SourceSetting } from '@shared/models/source';

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

  async save(id: string, setting: SourceSetting) {
    await this.remoteService.invoke('save', id, setting);
  }

  async list() {
    return await this.remoteService.invoke('list');
  }
}
