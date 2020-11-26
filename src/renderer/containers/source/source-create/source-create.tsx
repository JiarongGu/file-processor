import * as React from 'react';
import { Tag, Typography } from 'antd';
import { useSink } from 'react-redux-sink';

import { FileSelect } from '@components/file-select/file-select';
import { SourceCreateSink } from './source-create-sink';

import * as styles from './source-create.scss';
import { ExcelSourceCreate } from './excel-source-create/excel-source-create';

export const SourceCreate = () => {
  const sink = useSink(SourceCreateSink);

  const onFileSelect = React.useCallback((value?: string) => {
    sink.filePath = value;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.fileSection}>
        <div className={styles.inputGroup}>
          <FileSelect
            className={styles.inputField}
            text={'Select File'}
            type={'primary'}
            size={'small'}
            onChange={onFileSelect}
          />
          {sink.fileType && <Tag color={'#87d068'}>{sink.fileType}</Tag>}
          <Typography.Text className={styles.inputField}>{sink.filePath}</Typography.Text>
        </div>
      </div>
      {sink.filePath && <div className={styles.configSection}>{sink.excel && <ExcelSourceCreate />}</div>}
    </div>
  );
};
