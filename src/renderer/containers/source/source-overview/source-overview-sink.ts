import { SourceService } from '@services/source/source-service';
import { SourceSetting } from '@shared/models/source';
import { effect, sink, state } from 'react-redux-sink';
import { container } from 'tsyringe';

@sink('source-overview')
export class SourceOverviewSink {
  sourceService = container.resolve(SourceService);

  @state
  sources: { [key: string]: SourceSetting } = {};

  @state
  loading: boolean = false;

  @effect
  async load() {
    this.loading = true;
    this.sources = await this.sourceService.list();
  }
}
