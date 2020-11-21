import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SourceCreateSink } from '../source-create-sink';

import * as styles from './excel-source-create.scss';
import { ExcelSourceCreateSheet } from '../excel-source-create-sheet/excel-source-create-sheet';

export interface ExcelSourceCreateProps {
  className?: string;
}

export const ExcelSourceCreate: React.FC<ExcelSourceCreateProps> = ({ className }) => {
  const sink = useSink(SourceCreateSink, (state) => [state.excel, state.sources]);

  const sheetSettings = React.useMemo(() => {
    return Object.keys(sink.sources).map((id) => <ExcelSourceCreateSheet key={id} id={id} />);
  }, [sink.sources]);

  return (
    <div className={className}>
      {sheetSettings}
      <div className={styles.settingPlaceholder} onClick={sink.addExcelSource}>
        <div>
          <PlusOutlined /> Add More Setting
        </div>
      </div>
      <div className={styles.buttonSection}>
        <Button className={styles.button} type={'primary'} size={'small'} onClick={sink.addExcelSource}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};
