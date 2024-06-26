import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { toast } from 'sonner';
import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.mockInterview.$post>;
type RequestType = InferRequestType<
  typeof client.api.mockInterview.$post
>['json'];
export const useCreateQuest = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.mockInterview.$post({ json });
      const data = await response.json();
      if (!data) {
        throw new Error('Failed to create mock interview');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      toast.success('Mock interview created');
    },
    onError: (error) => {
      toast.error('Failed to create mock interview ' + error.message);
    },
  });
  return mutation;
};
