import * as fs from 'fs-extra';
import { delay, inject, injectable } from 'tsyringe';

import { FileType } from '@shared/models';
import { IFileService } from '@shared/remote';
import { PathService } from '@main/services';

@injectable()
export class FileService implements IFileService {
  constructor(@inject(delay(() => PathService)) private pathService: PathService) {}

  public async get<T>(filePath: string, type: FileType.Json): Promise<T>;
  public async get(filePath: string, type: FileType.ByteArray): Promise<ArrayBuffer>;
  public async get(filePath: string, type: FileType.Text): Promise<string>;
  public async get(filePath: string, type: FileType): Promise<any>;
  public async get(filePath: string, type: FileType) {
    if (type === FileType.Json) {
      return await fs.readJSON(filePath);
    }
    const file = await fs.readFile(filePath);

    if (type === FileType.Text) {
      return file.toString('utf-8');
    }

    return Uint8Array.from(file);
  }

  public read(filePath: string, type: FileType) {
    return this.get(this.pathService.getResourcePath(filePath), type);
  }

  public async write(filePath: string, text: string) {
    console.log(this.pathService.getResourcePath(filePath));
    await fs.writeFile(this.pathService.getResourcePath(filePath), text);
  }
}
