import * as React from 'react';
import { useSink } from 'react-redux-sink';
import * as XLSX from 'xlsx';

import { FileSettingCreateSink } from '../file-setting-create-sink';
import { ExcelFieldSourceSetting, ExcelSourceSetting } from '@shared/models/file-process-setting';
import { InputNumber } from 'antd';
export interface FileSettingCreateExcelSourceTestProps {
  settings: Array<ExcelFieldSourceSetting>;
  workSheet: XLSX.WorkSheet;
}

export const FileSettingCreateExcelSourceTest: React.FC<FileSettingCreateExcelSourceTestProps> = ({
  settings,
  workSheet,
}) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excelService, state.excelProcessService]);
  const [fields, setFields] = React.useState<Array<{ [key: string]: string }>>([]);
  const [rowFrom, setRowFrom] = React.useState(2);
  const [rowTo, setRowTo] = React.useState(2);

  React.useCallback(() => {
    const outputs = sink.excelProcessService.processSourceOutput(workSheet, settings, 2, 10);
    setFields(outputs);
  }, [rowFrom, rowTo]);

  const rowCount = sink.excelService.countRow(workSheet);

  return (
    <div>
      <div>
        <div>
          From: <InputNumber min={2} max={rowCount} defaultValue={rowFrom} />
        </div>
        <div>
          To: <InputNumber min={rowFrom} max={rowCount} defaultValue={rowTo} />
        </div>
      </div>
    </div>
  );
};
