'use client';
import React, { useState } from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import CardAddTransaction from '@/features/transactions/components/card-add-transaction';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import ImportCard from '@/features/transactions/components/import-card';
import { transactions as transactionSchema } from '@/db/schema';
import { useSelectAccount } from '@/features/transactions/hooks/useSelectAccout';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  erorr: [],
  meta: {},
};

const TransactionPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const { data: transactions, isLoading } = useGetTransactions();
  const { mutate, isPending } = useBulkDeleteTransactions();
  const bulkCreateMutation = useBulkCreateTransactions();
  const isDisable = isLoading || isPending;

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<
    typeof INITIAL_IMPORT_RESULTS
  >(INITIAL_IMPORT_RESULTS);

  const onUpload = (result: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(result);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULTS);
  };

  const onSubmitImport = async (
    value: (typeof transactionSchema.$inferInsert)[],
  ) => {
    const accountId = await confirm();
    if (!accountId) return toast.error('Please select an account');

    const data = value.map((item) => ({
      ...item,
      amount: item.amount * 1000,
      accountId: accountId as string,
    }));
    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Transactions created');
        onCancelImport();
      },
    });
    // setVariant(VARIANTS.LIST);
    // setImportResults(INITIAL_IMPORT_RESULTS);
  };

  if (isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <CardAddTransaction onUpload={() => {}}>
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
        </CardAddTransaction>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmmit={onSubmitImport}
        />
      </>
    );
  }
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <CardAddTransaction onUpload={onUpload}>
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
