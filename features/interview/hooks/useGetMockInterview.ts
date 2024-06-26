import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

export const useGetMockInterview = () => {
  const query = useQuery({
    queryKey: ['quests'],
    queryFn: async () => {
      const response = await client.api.mockInterview.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch mock interview data');
      }
      const { data } = await response.json();
      const mockInterviews = data.map((mockInterview) => ({
        ...mockInterview,
        jsonMockResponse: JSON.parse(mockInterview.jsonMockResponse),
      }));
      return mockInterviews;
    },
  });
  return query;
};
