'use client';
import React from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import CardAddTransaction from '@/features/transactions/components/card-add-transaction';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';

const TransactionPage = () => {
  const { data: transactions, isLoading } = useGetTransactions();
  const { mutate, isPending } = useBulkDeleteTransactions();
  const isDisable = isLoading || isPending;

  if (isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <CardAddTransaction>
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
        </CardAddTransaction>
      </div>
    );
  }
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <CardAddTransaction>
        <DataTable
          columns={columns}
          data={transactions || []}
          filterKey="payee"
          disable={isDisable}
          onDelete={(row) => {
            //@ts-ignore
            const ids = row?.map((el) => el.original.id);
            mutate({ ids });
          }}
        />
      </CardAddTransaction>
    </div>
  );
};

export default TransactionPage;
