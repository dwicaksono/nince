'use client';

import { formatDateRange } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useGetSummary } from '../api/use-get-summary';
import DataCard from './data-card';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaPiggyBank,
} from 'react-icons/fa';

const DataGrid = () => {
  const params = useSearchParams();
  const { data } = useGetSummary();
  const to = params.get('to') || undefined;
  const from = params.get('from') || undefined;
  const accountId = params.get('accountId') || undefined;

  const dateRangeLabel = formatDateRange({ to, from });

  return (
    <>
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        icon={FaPiggyBank}
        dateRange={dateRangeLabel}
        variant="default"
        percentageChange={data?.remainingChange}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        icon={FaArrowAltCircleUp}
        dateRange={dateRangeLabel}
        variant="default"
        percentageChange={data?.incomeChange}
      />
      <DataCard
        title="expenses"
        value={data?.expensesAmount}
        icon={FaArrowAltCircleDown}
        dateRange={dateRangeLabel}
        variant="default"
        percentageChange={data?.expensesChange}
      />
    </>
  );
};

export default DataGrid;
