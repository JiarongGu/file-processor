import * as React from 'react';
import * as classnames from 'classnames';
import Button, { ButtonShape, ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { remote } from 'electron';
import { FileFilter } from 'electron/main';

export interface FileOutputProps {
  text: string;
  onChange?: (value?: string) => void;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: SizeType;
  className?: string;
  title?: string;
  fileFilters?: FileFilter[];
}

export const FileOutput: React.FC<FileOutputProps> = ({ text, title, fileFilters, onChange, ...buttonProps }) => {
  const onButtonClick = React.useCallback(() => {
    const filePath = remote.dialog.showSaveDialogSync({
      filters: fileFilters,
      title: title,
    });
    if (onChange) {
      onChange(filePath);
    }
  }, []);

  return (
    <Button {...buttonProps} onClick={onButtonClick}>
      {text}
    </Button>
  );
};
