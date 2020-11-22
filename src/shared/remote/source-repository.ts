import { SourceSetting } from '@shared/models/source';

export interface ISourceRepository {
  list(): Promise<{ [key: string]: SourceSetting }>;

  save(id: string, setting: SourceSetting): Promise<void>;

  get(id: string): Promise<SourceSetting>;
}
