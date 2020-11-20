import * as React from 'react';
import { Layout, Menu } from 'antd';
import { useSink } from 'react-redux-sink';
import { Link } from 'react-router-dom';

import { NavigationSink } from '@sinks';
import Icon from '@ant-design/icons/lib/components/Icon';

export const AppNavigation: React.FunctionComponent = () => {
  const navigation = useSink(NavigationSink);
  const routeKeys = navigation.activeRoute && navigation.activeRoute.keys;
  const [collapsed, setCollapsed] = React.useState(true);
  const onCollapse = React.useCallback(() => setCollapsed(!collapsed), [collapsed]);

  return (
    <Layout.Sider collapsible={true} collapsed={collapsed} onCollapse={onCollapse}>
      <Menu theme={'dark'} mode={'inline'} selectedKeys={routeKeys} style={{ marginLeft: '-1px' }}>
        {navigation.routes
          .filter((route) => route.link)
          .map((route) => {
            const link = route.link!;
            const name = link.name || route.key;
            return (
              <Menu.Item key={route.key} title={name}>
                <Link to={link.url}>
                  {link.icon && <link.icon />}
                  {!collapsed && name}
                </Link>
              </Menu.Item>
            );
          })}
      </Menu>
    </Layout.Sider>
  );
};
