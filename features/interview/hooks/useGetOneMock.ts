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
      if (!data.result) {
        throw new Error('No mock interview found');
      }
      return {
        ...data.result,
        jsonMockResponse: JSON.parse(data.result.jsonMockResponse),
      };
    },
  });
  return query;
};
