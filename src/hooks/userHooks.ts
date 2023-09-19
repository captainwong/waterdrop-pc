import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { connectFactory, useAppContext } from "../utils/contextFactory";
import { GET_USER_INFO } from '../graphql/user';
import { IUser } from "../utils/types";

const USER_INFO = "USER_INFO";
const DEFAULT_USER_VALUE = {};

export const useUserInfoContext = () => useAppContext(USER_INFO);

export const connect = connectFactory(USER_INFO, DEFAULT_USER_VALUE);

export const useGetUserInfo = () => {
  const { setStore } = useUserInfoContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, refetch } = useQuery<{getUserInfo: IUser}>(GET_USER_INFO, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const {id, name, tel} = data.getUserInfo;
        setStore({ id, name, tel, });
        if (location.pathname.startsWith("/login"))
          navigate("/");
        return;
      }
      
      setStore({ refetchHandler: refetch });
      if (!location.pathname.startsWith("/login")) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      if (!location.pathname.startsWith("/login")) {
        navigate(`/login?redirect=${location.pathname}`);
      }
    }
  });

  return { loading, refetch };
};
