import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Input, Select, Typography } from 'antd';
import * as React from 'react';
import * as classnames from 'classnames';

import * as styles from './file-setting-create-excel-source-field.scss';
import { ExcelFieldConvertType } from '@shared/models/file-process-setting';

interface FileSettingCreateExcelSourceFieldProps {
  fields: string[];
  className?: string;
}

export const FileSettingCreateExcelSourceField: React.FC<FileSettingCreateExcelSourceFieldProps> = ({
  fields,
  className,
}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <Button type={'text'} danger>
        <CloseOutlined />
      </Button>
      <div className={styles.section}>
        <div className={styles.fieldProcess}>
          <div>
            <Select className={styles.fieldSelection} placeholder={'Select Input Field'}>
              {fields.map((field) => (
                <Select.Option key={field} value={field}>
                  {field}
                </Select.Option>
              ))}
            </Select>
          </div>
          <RightOutlined />
          <div>
            <Input className={styles.fieldSelection} placeholder={'Output Field'}></Input>
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
    </div>
  );
};
