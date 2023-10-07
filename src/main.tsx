import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import apolloClient from './utils/apollo';
import './index.css';
import { ROUTE_COMPONENTS } from './routes';
import { ROUTES } from './routes/menu';
import { NotFound } from './pages/404/notFound';
import UserInfo from './components/userInfo/UserInfo';
import { MainLayout } from './layouts/mainLayout/MainLayout';
import Login from './pages/login/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              {ROUTES.map((route) => {
                const Component = ROUTE_COMPONENTS[route.key];
                return (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
