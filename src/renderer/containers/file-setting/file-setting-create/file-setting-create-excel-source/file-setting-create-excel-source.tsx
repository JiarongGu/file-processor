import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';
import { Button, Input, Select } from 'antd';

import * as styles from './file-setting-create-excel-source.scss';
import { FileSettingCreateExcelSourceField } from '../file-setting-create-excel-source-field/file-setting-create-excel-source-field';

export interface FileSettingCreateExcelSheetProps {
  className?: string;
  id: string;
}

export const FileSettingCreateExcelSource: React.FC<FileSettingCreateExcelSheetProps> = ({ id, className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSourceSettings]);
  const setting = sink.excelSourceSettings[id];

  const [sheetName, setSheetName] = React.useState<string>();
  const [fields, setFields] = React.useState<string[]>();

  React.useEffect(() => {
    if (sink.excel && sheetName) {
      const sheet = sink.excel.Sheets[sheetName];
      setFields(sink.excelService.readRow(sheet, 1));
    }
    setting.sheetName = sheetName;
  }, [sheetName, sink.excel, setting]);

  const onNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setting.name = event.target.value;
    },
    [setting]
  );

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.processSelection}>
        <div className={styles.inputGroup}>
          <div className={classnames(styles.inputGroup, styles.inputName)}>
            <Input placeholder="Name of setting" onChange={onNameChange}></Input>
          </div>
          <Select placeholder="Select a sheet" onChange={(value: string) => setSheetName(value)}>
            {sink.excel?.SheetNames.map((name) => (
              <Select.Option value={name} key={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button onClick={() => sink.removeExcelSheetSetting(id)} type={'primary'} danger>
          Delete
        </Button>
      </div>
      {fields && (
        <div className={styles.fields}>
          <FileSettingCreateExcelSourceField className={styles.field} fields={fields} />
        </div>
      )}
    </div>
  );
};
