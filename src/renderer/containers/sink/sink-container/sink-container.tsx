import * as React from 'react';
import { useSink } from 'react-redux-sink';
import { Layout } from 'antd';

import { HeaderNavigation, RouteContent } from '@components';
import { NavigationSink } from '@sinks';
import { sinkRoute } from '../sink-route';

import * as styles from './sink-container.scss';

export const SinkContainer: React.FunctionComponent = () => {
  const layout = useSink(NavigationSink);
  const routes = sinkRoute.routes!;

  return (
    <Layout>
      <HeaderNavigation className={styles.header} routes={routes} selectedKeys={layout.activeRoute.keys} />
      <Layout.Content className={styles.content}>
        {sinkRoute && sinkRoute.routes && <RouteContent routes={sinkRoute.routes} />}
      </Layout.Content>
    </Layout>
  );
};
