import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { useSearchParams } from 'next/navigation';
import { converAmountFromMiliunits } from '@/lib/utils';

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const accountId = params.get('accountId') || '';

  const query = useQuery({
    queryKey: ['summary', { accountId, from, to }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: converAmountFromMiliunits(data.incomeAmount),
        expensesAmount: converAmountFromMiliunits(data.expensesAmount),
        remainingAmount: converAmountFromMiliunits(data.reaminingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: converAmountFromMiliunits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: converAmountFromMiliunits(day.income),
          expenses: converAmountFromMiliunits(day.expenses),
        })),
      };
    },
  });
  return query;
};
