import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';
import { Button } from 'antd';

import * as styles from './file-setting-create-excel.scss';
import { FileSettingCreateExcelSheet } from '../file-setting-create-excel-sheet/file-setting-create-excel-sheet';

export interface FileSettingCreateExcelProps {
  className?: string;
}

export const FileSettingCreateExcel: React.FC<FileSettingCreateExcelProps> = ({ className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSheetSourceSettings]);

  const sheetSettings = React.useMemo(() => {
    return Object.keys(sink.excelSheetSourceSettings).map((id) => <FileSettingCreateExcelSheet key={id} id={id} />);
  }, [sink.excelSheetSourceSettings]);

  return (
    <div className={className}>
      {sheetSettings}
      <div className={styles.buttonSection}>
        <Button type={'primary'} size={'small'} onClick={sink.addExcelSheetSetting}>
          Add Setting
        </Button>
      </div>
    </div>
  );
};
