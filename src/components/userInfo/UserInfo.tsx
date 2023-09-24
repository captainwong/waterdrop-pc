import { Spin } from 'antd';
import { connect, useGetUserInfo } from '../../hooks/userHooks';
import { IPropsChildren } from '@/types/children'; 

const UserInfoComponent = ({ children }: IPropsChildren) => {
  const { loading } = useGetUserInfo();

  return <Spin spinning={loading}>{children}</Spin>;
};

const UserInfo = connect(UserInfoComponent);

export default UserInfo;
