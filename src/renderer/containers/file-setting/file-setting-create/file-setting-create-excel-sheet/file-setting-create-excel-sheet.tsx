import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';

export interface FileSettingCreateExcelSheetProps {
  className?: string;
  name: string;
}

export const FileSettingCreateExcel: React.FC<FileSettingCreateExcelSheetProps> = ({ name, className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSheetSourceSettings]);

  return (
    <div className={className}>
      <div></div>
    </div>
  );
};
