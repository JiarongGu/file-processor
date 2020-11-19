import { FileProcessSetting } from '@shared/models/file-process-setting';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as lowdb from 'lowdb';
import { PathService } from '@main/services';

export interface DataModel {
  "file-process-setting": FileProcessSetting[];
}

export const dbContext = async () => {
  const pathService = new PathService();
  const filePath = pathService.getResourcePath('db.json');

  const fileAdapter: lowdb.AdapterAsync<DataModel> = new FileAsync(filePath);
  const dbContext = await lowdb(fileAdapter);
  return dbContext;
}
