import * as path from 'path';

import { EnvironmentService } from '@shared/services';
import { singleton } from 'tsyringe';

@singleton()
export class PathService {
  constructor(private environmentService: EnvironmentService) {}

  public get resourcesPath() {
    if (this.environmentService.isDevelopment) {
      return process.env.APP_RESOURCES as string;
    }
    return process.resourcesPath;
  }

  public getResourcePath(filePath: string) {
    return path.join(this.resourcesPath, filePath);
  }

  public relativeResourcePath(filePath: string): string {
    return path.relative(this.resourcesPath, filePath);
  }
}
