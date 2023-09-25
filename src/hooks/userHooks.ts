import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser, TUserQuery } from '@/types/user';
import { connectFactory, useAppContext } from '../utils/contextFactory';
import { GET_USER_BY_TOKEN } from '../graphql/user';

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
      if (data.getUserByToken.data) {
        const {
          id, name, desc, tel, avatar,
        } = data.getUserByToken.data;
        setStore({
          id, name, desc, tel, avatar, refetchHandler: refetch,
        });
        if (location.pathname.startsWith('/login')) {
          navigate('/');
        }
        return;
      }

      setStore({ refetchHandler: refetch });
      if (!location.pathname.startsWith('/login')) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      if (!location.pathname.startsWith('/login')) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    },
  });

  return { loading, refetch };
};
