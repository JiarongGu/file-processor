import * as React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';

import Title from 'antd/lib/typography/Title';
import * as styles from './header-banner.scss';

export interface HeaderMenuProps {
  className?: string;
  title: string;
}

export const HeaderBanner: React.FunctionComponent<HeaderMenuProps> = ({ title, className }) => {
  return (
    <Layout.Header className={classnames('section-header', className)}>
      <Title className={styles.title} level={3}>{title}</Title>
    </Layout.Header>
  );
};
