import * as React from 'react';
import { useSink } from 'react-redux-sink';
import * as XLSX from 'xlsx';

import { FileSettingCreateSink } from '../file-setting-create-sink';
import { ExcelFieldSourceSetting } from '@shared/models/file-process-setting';
import { Button, InputNumber, Table } from 'antd';

import * as styles from './file-setting-create-excel-source-test.scss';
export interface FileSettingCreateExcelSourceTestProps {
  settings: Array<ExcelFieldSourceSetting>;
  workSheet: XLSX.WorkSheet;
}

export const FileSettingCreateExcelSourceTest: React.FC<FileSettingCreateExcelSourceTestProps> = ({
  settings,
  workSheet,
}) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excelService, state.excelProcessService]);
  const rowCount = sink.excelService.countRow(workSheet);

  const [fields, setFields] = React.useState<Array<{ [key: string]: string }>>([]);
  const [rowFrom, setRowFrom] = React.useState(2);
  const [rowTo, setRowTo] = React.useState(rowCount);

  const onProcessClick = React.useCallback(() => {
    const outputs = sink.excelProcessService.processSourceOutput(workSheet, settings, rowFrom, rowTo);
    setFields(outputs);
  }, [rowFrom, rowTo]);

  const columns = settings
    .filter((x) => x.output || x.name)
    .map((x) => {
      const output = x.output || x.name;
      return { title: output, dataIndex: output, key: output };
    });

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div>
          From:{' '}
          <InputNumber
            min={2}
            max={rowCount}
            defaultValue={rowFrom}
            onChange={(value) => {
              value && setRowFrom(parseInt(value as any, 10));
            }}
          />
        </div>
        <div>
          To:{' '}
          <InputNumber
            min={rowFrom}
            max={rowCount}
            defaultValue={rowCount}
            onChange={(value) => {
              value && setRowTo(parseInt(value as any, 10));
            }}
          />
        </div>
        <div>
          <Button type={'primary'} onClick={onProcessClick}>
            Process
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={fields}
          pagination={{ pageSizeOptions: ['5', '10', '20', '50'], defaultPageSize: 5 }}
        />
      </div>
    </div>
  );
};
