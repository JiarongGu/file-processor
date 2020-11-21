import { RightOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import * as React from 'react';
import * as classnames from 'classnames';

import * as styles from './file-setting-create-excel-source-field.scss';
import { ExcelFieldConvertType, ExcelFieldSourceSetting } from '@shared/models/file-process-setting';

interface FileSettingCreateExcelSourceFieldProps {
  fields: Array<string>;
  className?: string;
  setting: ExcelFieldSourceSetting;
}

export const FileSettingCreateExcelSourceField: React.FC<FileSettingCreateExcelSourceFieldProps> = ({
  fields,
  className,
  setting,
}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.fieldProcess}>
        <div>
          <Select
            className={styles.fieldSelection}
            placeholder={'Select Input Field'}
            onChange={(value: string) => (setting.name = value)}
          >
            {fields.map((field) => (
              <Select.Option key={field} value={field}>
                {field}
              </Select.Option>
            ))}
          </Select>
        </div>
        <RightOutlined />
        <div>
          <Input
            className={styles.fieldSelection}
            placeholder={'Output Field'}
            onChange={(event) => (setting.output = event.target.value)}
          />
        </div>
      </div>
      <div className={styles.convertProcess}>
        <div>
          <Select defaultValue={ExcelFieldConvertType.None}>
            <Select.Option key={ExcelFieldConvertType.None} value={ExcelFieldConvertType.None}>
              None
            </Select.Option>
            <Select.Option key={ExcelFieldConvertType.Regex} value={ExcelFieldConvertType.Regex}>
              Regex
            </Select.Option>
            <Select.Option key={ExcelFieldConvertType.Script} value={ExcelFieldConvertType.Script}>
              Script
            </Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
};
