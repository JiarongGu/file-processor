import { FileHelper, FileService, PathService } from '@main/services';
import { FileType } from '@shared';
import { SinkSetting } from '@shared/models/sink/excel-sink-setting';
import { ISinkRepository } from '@shared/remote';
import { injectable } from 'tsyringe';

const SOURCE_DIR = 'sinks';

@injectable()
export class SinkRepository implements ISinkRepository {
  constructor(private fileService: FileService, private pathService: PathService) {}

  async list(): Promise<{ [key: string]: SinkSetting }> {
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

  async save(id: string, setting: SinkSetting) {
    await this.fileService.write(`${SOURCE_DIR}/${id}.json`, JSON.stringify(setting, null, 2));
  }

  async get(id: string): Promise<SinkSetting> {
    return await this.fileService.read(`${SOURCE_DIR}/${id}.json`, FileType.Json);
  }
}
