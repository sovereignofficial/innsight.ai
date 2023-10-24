import { useQueryClient } from '@tanstack/react-query';
import { toastStates } from '~/types/toast.d';
import { initiateToast } from '~/utils/helpers';

export const useErrorHandler = () => {
  const queryClient = useQueryClient();

  const handleError = (error: any) => {
    initiateToast({ state: toastStates.ERROR, message: `${error}` });
    queryClient.invalidateQueries();
  };

  return { handleError };
};
