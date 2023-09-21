/* eslint-disable import/prefer-default-export */
import { useGoTo } from '@/hooks';
import { useUserInfoContext } from '@/hooks/userHooks';
import { ROUTE_KEYS } from '@/routes/menu';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
// import styles from "./Home.module.css";

export const Home = () => {
  const { store } = useUserInfoContext();
  const { go } = useGoTo();
  return (
    <PageContainer>
      <div>{store.tel}</div>
      <Button onClick={() => go(ROUTE_KEYS.MY)}>个人中心</Button>
    </PageContainer>
  );
};
