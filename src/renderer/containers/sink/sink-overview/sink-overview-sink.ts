import { SourceService } from '@services/source/source-service';
import { SourceSetting } from '@shared/models/source';
import { ExcelSource } from '@shared/models/source/excel-source';
import { effect, sink, state } from 'react-redux-sink';
import { container } from 'tsyringe';

@sink('sink-overview')
export class SinkOverviewSink {
  @state
  sourceService = container.resolve(SourceService);

  @state
  sources: { [key: string]: ExcelSource } = {};

  @state
  loading: boolean = false;

  @effect
  async load() {
    this.loading = true;
    this.sources = (await this.sourceService.list()) as any;
  }
}
