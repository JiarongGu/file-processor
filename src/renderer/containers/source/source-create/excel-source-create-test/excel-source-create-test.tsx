import * as React from 'react';
import { useSink } from 'react-redux-sink';
import * as XLSX from 'xlsx';

import { SourceCreateSink } from '../source-create-sink';
import { Button, InputNumber, Table } from 'antd';

import * as styles from './excel-source-create-test.scss';
import { ExcelSourceField } from '@shared/models/source/excel-source';

export interface ExcelSourceCreateTestProps {
  settings: Array<ExcelSourceField>;
  workSheet: XLSX.WorkSheet;
}

export const ExcelSourceCreateTest: React.FC<ExcelSourceCreateTestProps> = ({ settings, workSheet }) => {
  const sink = useSink(SourceCreateSink, (state) => [state.excelService, state.excelProcessService]);
  const rowCount = sink.excelService.countRow(workSheet);

  const [fields, setFields] = React.useState<Array<{ [key: string]: string }>>([]);
  const [from, setRowFrom] = React.useState(2);
  const [to, setRowTo] = React.useState(rowCount);

  const onProcessClick = React.useCallback(() => {
    const outputs = sink.excelProcessService.process(settings, { sheet: workSheet, from, to });
    setFields(outputs);
  }, [from, to]);

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
            defaultValue={from}
            onChange={(value) => {
              value && setRowFrom(parseInt(value as any, 10));
            }}
          />
        </div>
        <div>
          To:{' '}
          <InputNumber
            min={to}
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
