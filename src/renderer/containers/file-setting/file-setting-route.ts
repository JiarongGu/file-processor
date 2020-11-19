import { SettingOutlined } from '@ant-design/icons';

import { RouteModel } from '@models';
import { FileSettingAdd } from './file-setting-add/file-setting-overview';
import { FileSettingContainer } from './file-setting-container/file-setting-container';
import { FileSettingOverview } from './file-setting-overview/file-setting-overview';


export const fileSettingRoute: RouteModel = {
  key: 'file-setting',
  link: {
    name: 'File Setting',
    icon: SettingOutlined,
    url: '/file-setting/overview',
  },
  config: {
    path: '/file-setting',
    component: FileSettingContainer
  },
  routes: [
    {
      key: 'file-setting.overview',
      link: {
        name: 'Overview',
        url: '/file-setting/overview'
      },
      config: {
        exact: true,
        path: '/file-setting/overview',
        component: FileSettingOverview
      }
    },
    {
      key: 'file-setting.add',
      link: {
        name: 'Create',
        url: '/file-setting/add'
      },
      config: {
        exact: true,
        path: '/file-setting/add',
        component: FileSettingAdd
      }
    }
  ]
};
