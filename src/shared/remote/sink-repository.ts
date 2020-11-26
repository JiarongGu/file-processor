import { SinkSetting } from '@shared/models/sink/excel-sink-setting';

export interface ISinkRepository {
  list(): Promise<{ [key: string]: SinkSetting }>;

  save(id: string, setting: SinkSetting): Promise<void>;

  get(id: string): Promise<SinkSetting>;
}
