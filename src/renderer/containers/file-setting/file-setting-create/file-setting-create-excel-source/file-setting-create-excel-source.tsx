import * as React from 'react';
import * as XLSX from 'xlsx';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';
import { Button, Input, Modal, Popconfirm, Select } from 'antd';

import * as styles from './file-setting-create-excel-source.scss';
import { FileSettingCreateExcelSourceField } from '../file-setting-create-excel-source-field/file-setting-create-excel-source-field';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { generateId } from '@shared';
import { ExcelFieldConvertType, ExcelFieldSourceSetting } from '@shared/models/file-process-setting';
import { FileSettingCreateExcelSourceTest } from '../file-setting-create-excel-source-test/file-setting-create-excel-source-test';

export interface FileSettingCreateExcelSheetProps {
  className?: string;
  id: string;
}

const defaultFieldSetting = () => ({
  converter: { type: ExcelFieldConvertType.None },
});

export const FileSettingCreateExcelSource: React.FC<FileSettingCreateExcelSheetProps> = ({ id, className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSourceSettings]);
  const setting = sink.excelSourceSettings[id];

  const [sheetName, setSheetName] = React.useState<string>();
  const [workSheet, setWorkSheet] = React.useState<XLSX.WorkSheet>();
  const [testModel, setTestModel] = React.useState(false);
  const [fields, setFields] = React.useState<Array<string>>();
  const [fieldSettings, setFieldSettings] = React.useState<{ [key: string]: ExcelFieldSourceSetting }>({});

  React.useEffect(() => {
    if (sink.excel && sheetName) {
      const sheet = sink.excel.Sheets[sheetName];
      setWorkSheet(sheet);
      setFields(sink.excelService.readRow(sheet, 1));
      setFieldSettings({ [generateId()]: defaultFieldSetting() });
    } else {
      setWorkSheet(undefined);
      setFields([]);
      setFieldSettings({});
    }
    setting.sheetName = sheetName;
  }, [sheetName, sink.excel, setting]);

  const onNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setting.name = event.target.value;
    },
    [setting]
  );

  const onAddFieldClicked = React.useCallback(() => {
    setFieldSettings((settings) => {
      return {
        ...settings,
        [generateId()]: defaultFieldSetting(),
      };
    });
  }, []);

  const onDeleteFieldClicked = React.useCallback((id) => {
    setFieldSettings((settings) => {
      delete settings[id];
      return {
        ...settings,
      };
    });
  }, []);

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.processSelection}>
        <div className={styles.inputGroup}>
          <div className={classnames(styles.inputGroup, styles.inputName)}>
            <Input placeholder={'Name of setting'} onChange={onNameChange} />
          </div>
          <Select placeholder={'Select a sheet'} onChange={(value: string) => setSheetName(value)}>
            {sink.excel?.SheetNames.map((name) => (
              <Select.Option value={name} key={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.buttonGroup}>
          <Button className={styles.button} onClick={() => setTestModel(true)} disabled={!workSheet}>
            Test
          </Button>
          <Modal
            visible={testModel}
            onCancel={() => setTestModel(false)}
            title={'Test Source Setting'}
            footer={[
              <Button key="cancel" onClick={() => setTestModel(false)}>
                Cancel
              </Button>,
            ]}
            centered={true}
            width={'100vw'}
          >
            {workSheet && (
              <FileSettingCreateExcelSourceTest settings={Object.values(fieldSettings)} workSheet={workSheet} />
            )}
          </Modal>
          <Button className={styles.button} type={'primary'}>
            Save
          </Button>
          <Popconfirm title={'Delete Settings?'} onConfirm={() => sink.deleteExcelSourceSetting(id)}>
            <Button className={styles.button} type={'primary'} danger={true}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      {fields && (
        <div className={styles.fields}>
          {Object.keys(fieldSettings).map((key) => (
            <div key={key} className={styles.field}>
              <Button onClick={() => onDeleteFieldClicked(key)} type={'text'} danger>
                <CloseOutlined />
              </Button>
              <FileSettingCreateExcelSourceField setting={fieldSettings[key]} fields={fields} />
            </div>
          ))}
          <div className={styles.fieldButton}>
            <Button size={'small'} type={'primary'} onClick={onAddFieldClicked}>
              <PlusOutlined />
              Add Field
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
