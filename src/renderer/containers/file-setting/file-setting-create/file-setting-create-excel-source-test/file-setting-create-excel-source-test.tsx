import { ExcelFieldSourceSetting, ExcelSourceSetting } from '@shared/models/file-process-setting';
import * as React from 'react';
import { useSink } from 'react-redux-sink';
import * as XLSX from 'xlsx';
import { FileSettingCreateSink } from '../file-setting-create-sink';

export interface FileSettingCreateExcelSourceTestProps {
  settings: ExcelFieldSourceSetting[];
  workSheet: XLSX.WorkSheet;
}

export const FileSettingCreateExcelSourceTest: React.FC<FileSettingCreateExcelSourceTestProps> = ({
  settings,
  workSheet,
}) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excelService, state.excelProcessService]);
  const [fields, setFields] = React.useState([]);

  React.useEffect(() => {
    const outputs = sink.excelProcessService.processSourceOutput(workSheet, settings, 2, 10);
    console.log(outputs, settings);
  }, []);

  return <div></div>;
};
