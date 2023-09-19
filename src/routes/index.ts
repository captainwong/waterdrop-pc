import { Home } from "../pages/home/Home";
import Login from "../pages/login/Login";

const ROUTES = [
  {
    key: 'home',
    path: '/',
    title: 'Home',
    element: Home,
  },
  {
    key: 'login',
    path: '/login',
    title: 'Login',
    element: Login,
  },
];

export default ROUTES;
