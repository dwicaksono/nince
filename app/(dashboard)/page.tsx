import React from 'react';
import DataGrid from '@/features/summary/components/data-grid';
import DataChart from '@/features/summary/components/data-cart';

export default function DashboardPage() {
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
        <DataGrid />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
        <DataChart />
      </div>
    </div>
  );
}
