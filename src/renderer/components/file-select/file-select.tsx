import * as React from 'react';
import * as classnames from 'classnames';
import { ButtonShape, ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface FileSelectProps {
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: SizeType;
  className?: string;
}

export const FileSelect: React.FC<FileSelectProps> = ({ className, text, onChange, type, shape, size }) => {
  return (
    <label
      className={classnames('ant-btn', className, {
        [`ant-btn-${type}`]: type,
        [`ant-btn-${shape}`]: shape,
        [`ant-btn-sm`]: size === 'small',
        [`ant-btn-lg`]: size === 'large',
      })}
    >
      <input type="file" style={{ display: 'none' }} onChange={onChange}></input>
      {text}
    </label>
  );
};
