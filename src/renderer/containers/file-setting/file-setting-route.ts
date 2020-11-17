import { RouteModel } from '@models';
import { FileSettingContainer } from './file-setting-container/file-setting-container';
import { FileSettingOverview } from './file-setting-overview/file-setting-overview';

export const fileSettingRoute: RouteModel = {
  key: 'character',
  link: {
    name: 'Character',
    icon: 'user',
    url: '/character/icon',
  },
  config: {
    path: '/character',
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
    }]
};
