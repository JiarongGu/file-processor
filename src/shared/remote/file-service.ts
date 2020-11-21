import { FileType } from '@shared/models';

export interface IFileService {
  read(filePath: string, type: FileType): Promise<any>;
}
