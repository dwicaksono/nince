'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Loader2 } from 'lucide-react';

import { useConfirm } from '@/hooks/useConfirm';
import { type FormValues, TransactionForm } from './transaction-form';
import { useOpenTransaction } from '../hooks/useOpenTransaction';
import { useGetTransaction } from '../api/use-get-transaction';
import { useEditTransaction } from '../api/use-edit-transaction';
import { useDeleteTransaction } from '../api/use-delete-transaction';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';

const EditSheetTransaction = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const transactionQuery = useGetTransaction(id);
  const { mutate, isPending } = useEditTransaction(id);
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this Transaction?',
    'Delete Transaction',
  );
  const { mutate: deleteMutate, isPending: deleteProcess } =
    useDeleteTransaction(id);

  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategories();
  const categoryMutation = useCreateCategory();
  const categoryOptions = (categoriesData ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const { data: AccountsData, isLoading: loadingAccounts } = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (AccountsData ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const defaultValues = transactionQuery.data
    ? {
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        amount: transactionQuery.data.amount.toString(),
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        notes: transactionQuery.data.notes,
        payee: transactionQuery.data.payee,
      }
    : {
        accountId: '',
        categoryId: '',
        date: new Date(),
        amount: '',
        notes: '',
        payee: '',
      };

  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              This action allows you to edit the account details.
            </SheetDescription>
          </SheetHeader>
          {transactionQuery.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={(values) => handleSubmit(values)}
              disable={isPending}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateCategory={onCreateCategory}
              onCreateAccount={onCreateAccount}
              defaultValues={defaultValues}
              onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditSheetTransaction;
