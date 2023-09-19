import { HomeOutlined } from "@ant-design/icons";
import { NotFound } from "@/pages/404/NotFound";
import { Home } from "../pages/home/Home";

const ROUTES = [
  {
    key: 'home',
    path: '/home',
    name: 'Home',
    element: Home,
    icon: <HomeOutlined />,
  },
  {
    key: '*',
    path: '*',
    name: '404',
    element: NotFound,
    hideInMenu: true,
  },
];

export default ROUTES;
