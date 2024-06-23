'use client';

import React from 'react';
import { useGetSummary } from '../api/use-get-summary';
import Chart from './chart';

const DataChart = () => {
  const { data, isLoading } = useGetSummary();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="col-span-1 lg:col-span-3 xl:col-span-4">
      <Chart data={data?.days} />
    </div>
  );
};

export default DataChart;
