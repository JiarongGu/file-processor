import * as React from 'react';
import { Tag, Typography } from 'antd';
import { useSink } from 'react-redux-sink';

import { FileSelect } from '@components/file-select/file-select';
import { FileSettingCreateSink } from './file-setting-create-sink';

import * as styles from './file-setting-create.scss';
import { FileSettingCreateExcel } from './file-setting-create-excel/file-setting-create-excel';

export const FileSettingCreate = () => {
  const sink = useSink(FileSettingCreateSink);

  const onFileSelect = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as any).files;
    sink.filePath = files && files[0]?.path;
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
          ></FileSelect>
          {sink.fileType && <Tag color={'#87d068'}>{sink.fileType}</Tag>}
          <Typography.Text className={styles.inputField}>{sink.filePath}</Typography.Text>
        </div>
      </div>
      {sink.filePath && <div className={styles.configSection}>{sink.excel && <FileSettingCreateExcel />}</div>}
    </div>
  );
};
