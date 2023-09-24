import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEYS = {
  HOME: 'home',
  MY: 'my',
  ORGANIZATION: 'organization',
  NO_ORG: 'noOrg',
  NOT_FOUND: '404',
  STUDENT: 'student',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEYS.HOME]: {
    path: 'home',
    name: 'Home',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEYS.MY]: {
    path: 'my',
    name: 'My',
    icon: <UserOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEYS.ORGANIZATION]: {
    path: 'organization',
    name: 'Organization',
    hideInMenu: true,
  },
  [ROUTE_KEYS.NO_ORG]: {
    path: 'noOrg',
    name: 'Please select an organization',
    hideInMenu: true,
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: '*',
    name: '404',
    hideInMenu: true,
  },
  [ROUTE_KEYS.STUDENT]: {
    path: 'student',
    name: 'Student',
  },
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
