import { FileHelper, FileService, PathService } from '@main/services';
import { FileType } from '@shared';
import { SourceSetting } from '@shared/models/source';
import { ISourceRepository } from '@shared/remote/source-repository';
import { injectable } from 'tsyringe';

const SOURCE_DIR = 'sources';

@injectable()
export class SourceRepository implements ISourceRepository {
  constructor(private fileService: FileService, private pathService: PathService) {}

  async list(): Promise<{ [key: string]: SourceSetting }> {
    const files = await FileHelper.readDirectory(this.pathService.getResourcePath(SOURCE_DIR));
    const settings = await Promise.all(
      files.map(async (file) => {
        const json = await this.fileService.read(this.pathService.relativeResourcePath(file), FileType.Json);
        return {
          key: FileHelper.getFileNameWithOutExtension(file),
          value: json,
        };
      })
    );
    return settings.reduce((p, c) => ((p[c.key] = c.value), p), {});
  }

  async save(id: string, setting: SourceSetting) {
    await this.fileService.write(`${SOURCE_DIR}/${id}.json`, JSON.stringify(setting, null, 2));
  }

  async get(id: string): Promise<SourceSetting> {
    return await this.fileService.read(`${SOURCE_DIR}/${id}.json`, FileType.Json);
  }
}
