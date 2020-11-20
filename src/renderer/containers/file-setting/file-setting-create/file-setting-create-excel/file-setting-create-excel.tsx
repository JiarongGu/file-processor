import * as React from 'react';
import * as classnames from 'classnames';
import { useSink } from 'react-redux-sink';
import { FileSettingCreateSink } from '../file-setting-create-sink';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import * as styles from './file-setting-create-excel.scss';

export interface FileSettingCreateExcelProps {
  className?: string;
}

export const FileSettingCreateExcel: React.FC<FileSettingCreateExcelProps> = ({ className }) => {
  const sink = useSink(FileSettingCreateSink, (state) => [state.excel, state.excelSheetSourceSettings]);
  const [selectedSheet, setSelectedSheet] = React.useState();

  const menu = React.useMemo(() => {
    const onClick = (name) => () => setSelectedSheet(name);
    return (
      <Menu>
        {sink.excel?.SheetNames.map((name) => (
          <Menu.Item key={name} onClick={onClick(name)}>
            {name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [sink.excel, sink.excel?.SheetNames]);

  const onAddSource = React.useCallback(() => {}, []);

  return (
    <div className={className}>
      <div className={styles.processSelection}>
        <Dropdown overlay={menu}>
          <a className={'ant-dropdown-link'}>
            {selectedSheet || 'Select sheet'} <DownOutlined />{' '}
          </a>
        </Dropdown>
      </div>
    </div>
  );
};
