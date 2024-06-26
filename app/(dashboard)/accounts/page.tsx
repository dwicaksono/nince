'use client';
import React from 'react';
import CardAddAccount from '@/features/accounts/components/card-add-account';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete';
import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';

const AccountPage = () => {
  const { data: accounts, isLoading } = useGetAccounts();
  const { id, isOpen } = useOpenAccount();
  const { mutate, isPending } = useBulkDeleteAccounts();
  const isDisable = isLoading || isPending;
  console.log({ id, isOpen });
  if (isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <CardAddAccount>
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
        </CardAddAccount>
      </div>
    );
  }
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <CardAddAccount>
        <DataTable
          columns={columns}
          data={accounts || []}
          filterKey="by email"
          disable={isDisable}
          onDelete={(row) => {
            //@ts-ignore
            const ids = row?.map((el) => el.original.id);
            mutate({ ids });
          }}
        />
      </CardAddAccount>
    </div>
  );
};

export default AccountPage;
