'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

import { useCreateTransaction } from '../api/use-create-transaction';
import { useSheetTransaction } from '../hooks/useSheetTransaction';
// import { type FormValues, TransactionForm } from './transaction-form';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { Loader2 } from 'lucide-react';
import { FormValues, TransactionForm } from './transaction-form';
const SheetTransaction = () => {
  const { isOpen, onClose } = useSheetTransaction();
  const { mutate, isPending: isPendingCreateTransaction } =
    useCreateTransaction();

  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
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

  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isLoading = loadingCategories || loadingAccounts;
  const isPending =
    isPendingCreateTransaction ||
    accountMutation.isPending ||
    categoryMutation.isPending;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create Transaction</SheetTitle>
          <SheetDescription>This Transaction action create </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolut inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={(values) => handleSubmit(values)}
            disable={isPending}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            onCreateCategory={onCreateCategory}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetTransaction;
