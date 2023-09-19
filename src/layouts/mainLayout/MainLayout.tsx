import { useUserInfoContext } from '@/hooks/userHooks';
import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import ROUTES from '@/routes';
import { AUTH_TOKEN } from '@/utils/constants';
import logo from '../../assets/henglogo@2x.png';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);

export const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const { store } = useUserInfoContext();
  const navigate = useNavigate();

  console.log(store);

  const logout = () => {
    console.log('logout');
    sessionStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/login');
  };

  return (
    <ProLayout
      layout="mix"
      avatarProps={{
        src: '',
        title: store.tel,
        size: 'small',
        render: (_, dom) => (
          <Dropdown
            menu={{
              items: [
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
      <PageContainer>{outlet}</PageContainer>
    </ProLayout>
  );
};
