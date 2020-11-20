import * as React from 'react';
import * as ExcelJS from 'exceljs';
import { Button } from 'antd';
import { Typography, Space } from 'antd';
import { useSink } from 'react-redux-sink';

import { FileSelect } from '@components/file-select/file-select';
import { FileSettingCreateSink } from './file-setting-create-sink';

import * as styles from './file-setting-create.scss';

export const FileSettingCreate = () => {
  const sink = useSink(FileSettingCreateSink);

  const onFileSelect = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    sink.filePath = event.target.value;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <FileSelect
          className={styles.inputField}
          text={'Choose file'}
          size={'small'}
          onChange={onFileSelect}
        ></FileSelect>
        <Typography.Text className={styles.inputField}>{sink.filePath}</Typography.Text>
      </div>
    </div>
  );
};
