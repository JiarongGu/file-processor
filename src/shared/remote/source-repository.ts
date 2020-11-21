import { SourceSetting } from '@shared/models/source';

export interface ISourceRepository {
  list(): Promise<Array<SourceSetting>>;
}
