import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEYS = {
  HOME: "home",
  MY: "my",
  NOT_FOUND: "404",
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
