import React from 'react';
import {
  HomeOutlined, IdcardOutlined, ReadOutlined, ShoppingOutlined, TeamOutlined, UserOutlined,
} from '@ant-design/icons';

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
  NOT_FOUND: 'notFound',
  STUDENT: 'student',
  COURSE: 'course',
  PRODUCT: 'product',
  TEACHER: 'teacher',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEYS.HOME]: {
    path: 'home',
    name: '主页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEYS.MY]: {
    path: 'my',
    name: '个人中心',
    icon: <UserOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEYS.ORGANIZATION]: {
    path: 'organization',
    name: '门店管理',
    hideInMenu: true,
  },
  [ROUTE_KEYS.NO_ORG]: {
    path: 'noOrg',
    name: 'Please select an organization',
    hideInMenu: true,
  },
  [ROUTE_KEYS.STUDENT]: {
    path: 'student',
    name: '学员管理',
    icon: <TeamOutlined />,
  },
  [ROUTE_KEYS.COURSE]: {
    path: 'course',
    name: '课程管理',
    icon: <ReadOutlined />,
  },
  [ROUTE_KEYS.PRODUCT]: {
    path: 'product',
    name: '商品管理',
    icon: <ShoppingOutlined />,
  },
  [ROUTE_KEYS.TEACHER]: {
    path: 'teacher',
    name: '教师管理',
    icon: <IdcardOutlined />,
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: '*',
    name: '404',
    hideInMenu: true,
  },
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
