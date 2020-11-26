import * as React from 'react';

import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as classnames from 'classnames';

import * as styles from './source-overview.scss';
import { RouteComponentProps } from 'react-router';
import { useSink } from 'react-redux-sink';
import { SourceOverviewSink } from './source-overview-sink';

const columns: ColumnsType<any> = [{ title: 'Name', dataIndex: 'name' }];

export const SourceOverview = (props: RouteComponentProps) => {
  const sink = useSink(SourceOverviewSink);

  const create = React.useCallback(() => {
    props.history.push('/source/create');
  }, []);

  React.useEffect(() => {
    sink.load();
  }, []);

  const sources = React.useMemo(() => {
    return Object.keys(sink.sources).map((x) => {
      const source = sink.sources[x];

      return { name: source.name ?? x, type: source.category, key: x };
    });
  }, [sink.sources]);

  return (
    <div className={classnames('section-container', styles.container)}>
      <div className={styles.actions}>
        <Button onClick={create} type={'primary'}>
          Create New Setting
        </Button>
      </div>
      <Table columns={columns} dataSource={sources} />
    </div>
  );
};
