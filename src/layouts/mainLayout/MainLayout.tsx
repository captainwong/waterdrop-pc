import { useUserInfoContext } from '@/hooks/userHooks';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { ROUTES, ROUTE_KEYS } from '@/routes/menu';
import { AUTH_TOKEN } from '@/utils/constants';
import { useGoTo } from '@/hooks';
import logo from '../../assets/henglogo@2x.png';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);

export const MainLayout = () => {
  const outlet = useOutlet();
  const { store } = useUserInfoContext();
  const navigate = useNavigate();
  const { go } = useGoTo();

  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/login');
  };

  return (
    <ProLayout
      layout="mix"
      avatarProps={{
        src: store.avatar || '',
        title: store.name || '',
        size: 'small',
        render: (_, dom) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'my',
                  icon: <UserOutlined />,
                  label: '个人中心',
                  onClick: () => go(ROUTE_KEYS.MY),
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: logout,
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        ),
      }}
      logo={logo}
      title={false}
      route={{
        path: '/',
        routes: ROUTES,
      }}
      menuItemRender={menuItemRender}
      onMenuHeaderClick={() => navigate('/home')}
      actionsRender={(props) => {
        if (props) return [];
        return [];
      }}
    >
      {outlet}
    </ProLayout>
  );
};
