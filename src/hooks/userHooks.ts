import { useLocation, useNavigate } from 'react-router-dom';
import { IUser, TUserQuery } from '@/types/user';
import { GET_USER_BY_TOKEN } from '@/graphql/user';
import { useQuery } from '@apollo/client';
import { connectFactory, useAppContext } from '../utils/contextFactory';

const USER_INFO = 'USER_INFO';
const DEFAULT_USER_VALUE = {};

export const useUserInfoContext = () => useAppContext<IUser>(USER_INFO);

export const connect = connectFactory(USER_INFO, DEFAULT_USER_VALUE);

export const useGetUserInfo = () => {
  const { setStore } = useUserInfoContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, refetch } = useQuery<TUserQuery>(GET_USER_BY_TOKEN, {
    onCompleted: (data) => {
      if (data.getUserByToken.code === 200) {
        setStore({ ...data?.getUserByToken.data, refetch });
        if (location.pathname.startsWith('/login')) {
          navigate('/');
        }
        return;
      }

      setStore({ refetch });
      if (!location.pathname.startsWith('/login')) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetch });
      if (!location.pathname.startsWith('/login')) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    },
  });

  return { loading, refetch };
};
