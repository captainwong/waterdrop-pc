/* eslint-disable prettier/prettier */
import { useGoTo } from '@/hooks';
import { useUserInfoContext } from '@/hooks/userHooks';
import { ROUTE_KEYS } from '@/routes/menu';
import { Button, Result } from 'antd';
import { useEffect } from 'react';

export const NoOrganization = () => {
  const { store } = useUserInfoContext();
  const { go } = useGoTo();
  useEffect(() => {
    if (store.selectedOrganizationId) {
      go(ROUTE_KEYS.HOME);
    }
  }, [go, store.selectedOrganizationId]);

  return (
    <Result
      status="404"
      title="请选择门店"
      subTitle="抱歉，请选择门店。"
      extra={(
        <Button type="primary" href="/">
          返回首页
        </Button>
      )}
    />
  );
};
