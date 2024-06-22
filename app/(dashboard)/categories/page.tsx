'use client';
import React from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import CardAddCategory from '@/features/categories/components/card-add-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete';

const AccountPage = () => {
  const { data: accounts, isLoading } = useGetCategories();
  const { mutate, isPending } = useBulkDeleteCategories();
  const isDisable = isLoading || isPending;

  if (isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <CardAddCategory>
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
          <Skeleton className="my-2 h-8 w-full" />
        </CardAddCategory>
      </div>
    );
  }
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <CardAddCategory>
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
      </CardAddCategory>
    </div>
  );
};

export default AccountPage;
