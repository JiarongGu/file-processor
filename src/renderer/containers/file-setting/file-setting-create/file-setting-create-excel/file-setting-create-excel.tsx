import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';
import { Button } from 'antd';

import * as styles from './file-setting-create-excel.scss';
import { FileSettingCreateExcelSource } from '../file-setting-create-excel-source/file-setting-create-excel-source';
import { PlusOutlined } from '@ant-design/icons';

export interface FileSettingCreateExcelProps {
  className?: string;
}

export const FileSettingCreateExcel: React.FC<FileSettingCreateExcelProps> = ({ className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSourceSettings]);

  const sheetSettings = React.useMemo(() => {
    return Object.keys(sink.excelSourceSettings).map((id) => <FileSettingCreateExcelSource key={id} id={id} />);
  }, [sink.excelSourceSettings]);

  return (
    <div className={className}>
      {sheetSettings}
      <div className={styles.settingPlaceholder} onClick={sink.addExcelSourceSetting}>
        <div>
          <PlusOutlined /> Add More Setting
        </div>
      </div>
      <div className={styles.buttonSection}>
        <Button className={styles.button} type={'primary'} size={'small'} onClick={sink.addExcelSourceSetting}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};
