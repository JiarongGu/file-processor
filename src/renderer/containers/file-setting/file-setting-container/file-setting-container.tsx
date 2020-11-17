import * as React from 'react';
import { useSink } from 'react-redux-sink';
import { Layout } from 'antd';

import { HeaderNavigation, RouteContent } from '@components';
import { NavigationSink } from '@sinks';
import { fileSettingRoute } from '../file-setting-route';

import * as styles from './file-setting-container.scss';

export const FileSettingContainer: React.FunctionComponent = () => {
  const layout = useSink(NavigationSink);
  const routes = fileSettingRoute.routes!;

  return (
    <Layout>
      <HeaderNavigation routes={routes} className={styles.header} selectedKeys={layout.activeRoute.keys} />
      <Layout.Content className={styles.content}>
        <RouteContent routes={routes} />
      </Layout.Content>
    </Layout>
  );
};
