import { sink, state, trigger } from 'react-redux-sink';

@sink('file-setting-create')
export class FileSettingCreateSink {
  @state
  filePath?: string;

  @trigger('file-setting-create/filePath')
  triggerFilePath(filePath: string) {
    console.log(filePath);
  }
}
