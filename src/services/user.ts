import { UPDATE_USER_BY_TOKEN } from '@/graphql/user';
import {
  TUser, TUserMutation,
} from '@/types/user';
import { useMutation } from '@apollo/client';

export type TUpdateUserByToken = (
  id: string,
  dto: TUser,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useUpdateUserByToken = ():[TUpdateUserByToken, boolean] => {
  const [update, { loading }] = useMutation<TUserMutation>(UPDATE_USER_BY_TOKEN);

  const updateUserByToken = async (
    id: string,
    dto: TUser,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await update({
      variables: {
        id,
        dto,
      },
    });
    if (res.data?.updateUserByToken?.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.updateUserByToken?.message || 'error');
    }
  };

  return [updateUserByToken, loading];
};
