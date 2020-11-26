import * as React from 'react';
import * as classnames from 'classnames';
import { ButtonShape, ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface FileSelectProps {
  text: string;
  onChange?: (value?: string) => void;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: SizeType;
  className?: string;
}

export const FileSelect: React.FC<FileSelectProps> = ({ className, text, onChange, type, shape, size }) => {
  const onFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = (event.target as any).files;
      if (onChange) {
        onChange(files && files[0]?.path);
      }
    },
    [onChange]
  );

  return (
    <label
      className={classnames('ant-btn', className, {
        [`ant-btn-${type}`]: type,
        [`ant-btn-${shape}`]: shape,
        [`ant-btn-sm`]: size === 'small',
        [`ant-btn-lg`]: size === 'large',
      })}
    >
      <input type="file" style={{ display: 'none' }} onChange={onFileChange}></input>
      {text}
    </label>
  );
};
