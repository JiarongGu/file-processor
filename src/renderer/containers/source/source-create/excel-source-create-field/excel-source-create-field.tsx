import { RightOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import * as React from 'react';
import * as classnames from 'classnames';

import * as styles from './excel-source-create-field.scss';
import { ExcelFieldConvertorType, ExcelSourceField } from '@shared/models/source/excel-source';

interface ExcelSourceCreateFieldProps {
  fields: Array<string>;
  className?: string;
  setting: ExcelSourceField;
  sourceId: string;
}

export const ExcelSourceCreateField: React.FC<ExcelSourceCreateFieldProps> = ({
  fields,
  className,
  sourceId,
  setting,
}) => {
  const [converterType, setConvertorType] = React.useState(ExcelFieldConvertorType.None);

  const onConverterTypeChange = React.useCallback(
    (value) => {
      setting.converter.type = value;
      setConvertorType(value);
    },
    [converterType]
  );

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.fieldProcess}>
        <div>
          <Select
            className={styles.fieldSelection}
            placeholder={'Select Input Field'}
            defaultValue={setting.name}
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
          <Select defaultValue={converterType} onChange={onConverterTypeChange}>
            <Select.Option value={ExcelFieldConvertorType.None}>None</Select.Option>
            <Select.Option value={ExcelFieldConvertorType.Regex}>Regex</Select.Option>
            <Select.Option value={ExcelFieldConvertorType.Script}>Script</Select.Option>
          </Select>
        </div>
        {converterType === ExcelFieldConvertorType.Script && (
          <Input.TextArea
            className={styles.convertScript}
            onChange={(event) => {
              setting.converter.value = event.target.value;
            }}
          />
        )}
      </div>
    </div>
  );
};
