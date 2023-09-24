import { Spin } from 'antd';
import { IPropsChildren } from '@/types/children';
import { connect, useGetUserInfo } from '../../hooks/userHooks';

const UserInfoComponent = ({ children }: IPropsChildren) => {
  const { loading } = useGetUserInfo();

  return <Spin spinning={loading}>{children}</Spin>;
};

const UserInfo = connect(UserInfoComponent);

export default UserInfo;
