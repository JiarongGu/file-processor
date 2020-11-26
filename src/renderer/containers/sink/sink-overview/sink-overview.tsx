import * as React from 'react';
import { Typography, Select, Button } from 'antd';
import { useSink } from 'react-redux-sink';
import classnames from 'classnames';

import { FileSelect } from '@components/file-select/file-select';
import { SinkOverviewSink } from './sink-overview-sink';

import * as styles from './sink-overview.scss';
import { FileOutput } from '@components';
import { FileType } from '@shared';

export const SinkOverview = () => {
  const sink = useSink(SinkOverviewSink);
  const [selectedInput, setSelectedInput] = React.useState<string>();
  const [selectedOutput, setSelectedOutput] = React.useState<string>();
  const [selectedSource, setSelectedSource] = React.useState<string>();

  React.useEffect(() => {
    sink.load();
  }, []);

  const onInputSelect = React.useCallback((value?: string) => {
    setSelectedInput(value);
  }, []);

  const onOutputSelect = React.useCallback((value?: string) => {
    setSelectedOutput(value);
  }, []);

  const onSourceSelect = React.useCallback((value: string) => {
    setSelectedSource(value);
  }, []);

  const onProcessClick = React.useCallback(() => {
    if (selectedInput && selectedOutput && selectedSource) {
      sink.sourceService.processFile(selectedInput, selectedOutput, sink.sources[selectedSource], FileType.Excel);
    }
  }, [selectedInput, selectedOutput, selectedSource]);

  return (
    <div className={styles.container}>
      <div className={styles.fileSection}>
        <div className={styles.inputGroup}>
          <FileSelect
            className={classnames(styles.inputField, styles.inputFieldSelect)}
            text={'Select Input'}
            type={'primary'}
            size={'small'}
            onChange={onInputSelect}
          />
          {selectedInput && <Typography.Text className={styles.inputField}>{selectedInput}</Typography.Text>}
        </div>

        <div className={styles.inputGroup}>
          <FileOutput
            className={classnames(styles.inputField, styles.inputFieldSelect)}
            text={'Select Output'}
            type={'default'}
            size={'small'}
            onChange={onOutputSelect}
          />
          {selectedOutput && <Typography.Text className={styles.inputField}>{selectedOutput}</Typography.Text>}
        </div>

        <div className={styles.inputGroup}>
          <Select
            className={styles.inputField}
            defaultValue={selectedSource}
            placeholder={'Select source'}
            onSelect={onSourceSelect}
          >
            {Object.keys(sink.sources).map((field) => (
              <Select.Option key={field} value={field}>
                {field}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className={styles.inputGroup} onClick={onProcessClick}>
          <Button type={'primary'} className={styles.inputField}>
            Process
          </Button>
        </div>
      </div>
    </div>
  );
};
