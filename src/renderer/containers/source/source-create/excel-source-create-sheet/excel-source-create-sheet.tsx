import * as React from 'react';
import * as XLSX from 'xlsx';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Select } from 'antd';

import { generateId } from '@shared';
import { SourceCreateSink } from '../source-create-sink';

import * as styles from './excel-source-create-sheet.scss';
import { ExcelSourceCreateTest } from '../excel-source-create-test/excel-source-create-test';
import { ExcelSourceCreateField } from '../excel-source-create-field/excel-source-create-field';
import { ExcelFieldConvertorType, ExcelSourceField } from '@shared/models/source/excel-source';

export interface ExcelSourceCreateSheetProps {
  className?: string;
  id: string;
}

const defaultFieldSetting = () => ({
  converter: { type: ExcelFieldConvertorType.None },
});

export const ExcelSourceCreateSheet: React.FC<ExcelSourceCreateSheetProps> = ({ id, className }) => {
  const sink = useSink(SourceCreateSink, (state) => [state.excel, state.sources]);
  const setting = sink.sources[id];

  const [sheetName, setSheetName] = React.useState<string>();
  const [workSheet, setWorkSheet] = React.useState<XLSX.WorkSheet>();
  const [testModel, setTestModel] = React.useState(false);
  const [fields, setFields] = React.useState<Array<string>>();

  React.useEffect(() => {
    if (sink.excel && sheetName) {
      const sheet = sink.excel.Sheets[sheetName];
      setWorkSheet(sheet);
      setFields(sink.excelService.readRow(sheet, 1));
      sink.clearSourceField(id);
      sink.addSourceField(id);
    } else {
      setWorkSheet(undefined);
      setFields([]);
      sink.clearSourceField(id);
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
            {workSheet && <ExcelSourceCreateTest settings={sink.sources[id].fields} workSheet={workSheet} />}
          </Modal>
          <Button className={styles.button} type={'primary'} onClick={() => sink.saveSource(id)}>
            Save
          </Button>
          <Popconfirm title={'Delete Settings?'} onConfirm={() => sink.deleteSource(id)}>
            <Button className={styles.button} type={'primary'} danger={true}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      {fields && (
        <div className={styles.fields}>
          {sink.sources[id].fields.map((field, index) => (
            <div key={index} className={styles.field}>
              <Button onClick={() => sink.deleteSourceField(id, index)} type={'text'} danger={true}>
                <CloseOutlined />
              </Button>
              <ExcelSourceCreateField sourceId={id} setting={field} fields={fields} />
            </div>
          ))}
          <div className={styles.fieldButton}>
            <Button size={'small'} type={'primary'} onClick={() => sink.addSourceField(id)}>
              <PlusOutlined />
              Add Field
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
