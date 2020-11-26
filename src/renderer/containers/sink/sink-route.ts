import { DeliveredProcedureOutlined } from '@ant-design/icons';

import { RouteModel } from '@models';
import { SinkContainer } from './sink-container/sink-container';
import { SinkOverview } from './sink-overview/sink-overview';

export const sinkRoute: RouteModel = {
  key: 'sink',
  link: {
    name: 'Sink',
    icon: DeliveredProcedureOutlined,
    url: '/sink/overview',
  },
  config: {
    path: '/sink',
    component: SinkContainer,
  },
  routes: [
    {
      key: 'sink.overview',
      link: { url: '/sink/overview', name: 'Overview' },
      config: {
        exact: true,
        path: '/sink/overview',
        component: SinkOverview,
      },
    },
  ],
};
