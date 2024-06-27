import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export const useGetOneMock = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['quests', { id }],
    queryFn: async () => {
      const response = await client.api.mockInterview[':id'].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch mock interview data');
      }
      const data = await response.json();
      return data.result;
    },
  });
  return query;
};
