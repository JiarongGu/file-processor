import { FileHelper, FileService, PathService } from '@main/services';
import { FileType } from '@shared';
import { SourceSetting } from '@shared/models/source';
import { ISourceRepository } from '@shared/remote/source-repository';
import { injectable } from 'tsyringe';

const SOURCE_DIR = 'sources';

@injectable()
export class SourceRepository implements ISourceRepository {
  constructor(private fileService: FileService, private pathService: PathService) {}

  async list(): Promise<Array<SourceSetting>> {
    const files = await FileHelper.readDirectory(this.pathService.getResourcePath(SOURCE_DIR));
    const settings = await Promise.all(files.map((file) => this.fileService.read(file, FileType.Json)));
    return settings;
  }
}
