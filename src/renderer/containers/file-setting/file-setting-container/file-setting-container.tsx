import * as React from 'react';
import { useSink } from 'react-redux-sink';
import { Layout } from 'antd';

import { RouteContent } from '@components';
import { NavigationSink } from '@sinks';
import { fileSettingRoute } from '../file-setting-route';

import * as styles from './file-setting-container.scss';
import { HeaderBanner } from '@components/header-banner/header-banner';

export const FileSettingContainer: React.FunctionComponent = () => {
  const layout = useSink(NavigationSink);
  const routes = fileSettingRoute.routes!;

  return (
    <Layout>
      {/* <HeaderNavigation routes={routes} className={styles.header} selectedKeys={layout.activeRoute.keys} /> */}
      <HeaderBanner title={layout.activeRoute.model.banner ?? ''} />
      <Layout.Content className={styles.content}>
        <RouteContent routes={routes} />
      </Layout.Content>
    </Layout>
  );
};
