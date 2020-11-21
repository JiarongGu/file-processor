import { SettingOutlined } from '@ant-design/icons';

import { RouteModel } from '@models';
import { SourceContainer } from './source-container/source-container';
import { SourceCreate } from './source-create/source-create';
import { SourceOverview } from './source-overview/source-overview';

export const sourceRoute: RouteModel = {
  key: 'source',
  link: {
    name: 'Sources',
    icon: SettingOutlined,
    url: '/source/overview',
  },
  config: {
    path: '/source',
    component: SourceContainer,
  },
  routes: [
    {
      key: 'source.overview',
      banner: 'Source Settings',
      config: {
        exact: true,
        path: '/source/overview',
        component: SourceOverview,
      },
    },
    {
      key: 'source.create',
      banner: 'Source Settings - Create',
      config: {
        exact: true,
        path: '/source/create',
        component: SourceCreate,
      },
    },
  ],
};
