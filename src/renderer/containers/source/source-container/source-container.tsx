import * as React from 'react';
import { useSink } from 'react-redux-sink';
import { Layout } from 'antd';

import { RouteContent } from '@components';
import { NavigationSink } from '@sinks';
import { sourceRoute } from '../source-route';

import * as styles from './source-container.scss';
import { HeaderBanner } from '@components/header-banner/header-banner';

export const SourceContainer: React.FunctionComponent = () => {
  const layout = useSink(NavigationSink);
  const routes = sourceRoute.routes!;

  return (
    <Layout>
      <HeaderBanner title={layout.activeRoute.model.banner ?? ''} />
      <Layout.Content className={styles.content}>
        {sourceRoute && sourceRoute.routes && <RouteContent routes={sourceRoute.routes} />}
      </Layout.Content>
    </Layout>
  );
};
