import * as React from 'react';

import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as classnames from 'classnames';

import * as styles from './file-setting-overview.scss';
import { RouteComponentProps } from 'react-router';

const columns: ColumnsType<any> = [{ title: 'Name', dataIndex: 'name' }];

export const FileSettingOverview = (props: RouteComponentProps) => {
  const create = React.useCallback(() => {
    props.history.push('/file-setting/add');
  }, []);

  return (
    <div className={classnames('section-container', styles.container)}>
      <div className={styles.actions}>
        <Button onClick={create} type={'primary'}>
          Create New Setting
        </Button>
      </div>
      <Table columns={columns} />
    </div>
  );
};
