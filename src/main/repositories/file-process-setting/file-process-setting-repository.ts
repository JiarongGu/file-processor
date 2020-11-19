import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { FileProcessSetting } from '@shared/models/file-process-setting';
import { CommonFileProcessSetting } from '@shared/models/file-process-setting/common-file-process-setting';
import { ExcelFieldProcessSetting } from '@shared/models/file-process-setting/excel-process-setting';
import { FileProcessSettingType } from '@shared/models/file-process-setting/file-process-setting-type.enum';
import { IFileProcessSettingRepository } from '@shared/remote/file-process-setting-repository';
import { dbContext } from '../db-context';

export class FileProcessSettingRepository implements IFileProcessSettingRepository {
  async list(type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting[]>;
  async list(type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting[]>;
  async list(): Promise<FileProcessSetting[]>;
  async list(type?: FileProcessSettingType): Promise<FileProcessSetting[]> {
    const collection = await this.collection();
    if (!type) {
      return collection.value();
    } else {
      return collection.filter((x) => (x as any).type === type).value();
    }
  }

  async fetch(id: string, type: FileProcessSettingType.Common): Promise<CommonFileProcessSetting>;
  async fetch(id: string, type: FileProcessSettingType.Excel): Promise<ExcelFieldProcessSetting>;
  async fetch(id: string): Promise<FileProcessSetting>;
  async fetch(id: string, _?: FileProcessSettingType): Promise<FileProcessSetting> {
    const collection = await this.collection();
    return collection
      .filter((x) => x.id === id)
      .first()
      .value();
  }

  async create(value: CommonFileProcessSetting): Promise<CommonFileProcessSetting>;
  async create(value: ExcelFieldProcessSetting): Promise<ExcelFieldProcessSetting>;
  async create(value: FileProcessSetting): Promise<FileProcessSetting> {
    value.id = uuid();
    const collection = await this.collection();
    await collection.push(value).write();
    return value;
  }

  async update(value: FileProcessSetting) {
    const collection = await this.collection();
    await collection
      .find((x) => x.id === value.id)
      .assign(value)
      .write();
  }

  async delete(id: string): Promise<void> {
    const collection = await this.collection();
    await collection
      .filter((x) => x.id === id)
      .remove()
      .write();
  }

  private async collection() {
    return (await dbContext()).get('file-process-setting');
  }
}
