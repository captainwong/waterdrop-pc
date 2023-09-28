import { CREATE_OR_UPDATE_CARD, DELETE_CARD, GET_CARDS } from '@/graphql/card';
import {
  TCard, TCardMutation, TCardsQuery,
} from '@/types/card';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const useCards = (courseId: string) => {
  const { data, loading, refetch } = useQuery<TCardsQuery>(GET_CARDS, {
    variables: {
      courseId,
    },
  });
  return { loading, refetch, cards: data?.getCards.data || [] };
};

export const useLazyCards = () => {
  const [get, { data, loading }] = useLazyQuery<TCardsQuery>(GET_CARDS);
  const getCards = (courseId: string) => get({
    variables: {
      courseId,
    },
  });
  return {
    loading, cards: data?.getCards.data || [], getCards,
  };
};

export type TCreateOrUpdateCard = (
  courseId: string,
  dto: TCard,
  id?: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrUpdateCard = (): [TCreateOrUpdateCard, boolean] => {
  const [commit, { loading }] = useMutation<TCardMutation>(CREATE_OR_UPDATE_CARD);
  const createOrUpdateCard: TCreateOrUpdateCard
    = async (courseId, dto, id, onSuccess, onError) => {
      const res = await commit({
        variables: {
          courseId,
          id,
          dto,
        },
      });
      if (res.data?.createOrUpdateCard.code === 200) {
        onSuccess?.();
      } else {
        onError?.(res.data?.createOrUpdateCard.message || 'error');
      }
    };

  return [createOrUpdateCard, loading];
};

export type TDeleteCard = (
  courseId: string,
  id: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useDeleteCard = () : [TDeleteCard, boolean] => {
  const [remove, { loading }] = useMutation<TCardMutation>(DELETE_CARD);
  const deleteCard = async (
    courseId: string,
    id: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await remove({
      variables: {
        courseId,
        id,
      },
    });
    if (res.data?.deleteCard.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.deleteCard.message || 'error');
    }
  };
  return [deleteCard, loading];
};
