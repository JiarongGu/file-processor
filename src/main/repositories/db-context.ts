import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as lowdb from 'lowdb';
import { PathService } from '@main/services';
import { container } from 'tsyringe';

export interface DataModel {}

export const dbContext = async () => {
  const pathService = container.resolve(PathService);
  const filePath = pathService.getResourcePath('db.json');

  const fileAdapter: lowdb.AdapterAsync<DataModel> = new FileAsync(filePath);
  const dbContext = await lowdb(fileAdapter);
  return dbContext;
};
