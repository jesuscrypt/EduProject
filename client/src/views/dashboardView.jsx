import React, { Fragment } from 'react';

import { Content } from '../components/layout/Content';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const DashboardView = () => (
  <Fragment>
    <Header title="Панель управления" />
    <Content>
      #AdminAccess
    </Content>
  </Fragment>
);
