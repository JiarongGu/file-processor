import { SettingOutlined } from '@ant-design/icons';

import { RouteModel } from '@models';
import { FileSettingCreate } from './file-setting-create/file-setting-create';
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
      banner: 'File Process Settings',
      config: {
        exact: true,
        path: '/file-setting/overview',
        component: FileSettingOverview
      }
    },
    {
      key: 'file-setting.add',
      banner: 'File Process Settings - Create',
      config: {
        exact: true,
        path: '/file-setting/add',
        component: FileSettingCreate
      }
    }
  ]
};
