'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AccountForm,
  type FormValues,
} from '@/features/accounts/components/acoount-form';
import { useOpenAccount } from '../hooks/useOpenAccount';
import { useGetAccount } from '../api/use-get-account';
import { Loader2 } from 'lucide-react';
import { useEditAccount } from '../api/use-edit-account';

import { useDeleteAccount } from '../api/use-delete-account';
import { useConfirm } from '@/hooks/useConfirm';

const EditSheetAccount = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount(id);
  const { mutate, isPending } = useEditAccount(id);
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this account?',
    'Delete Account',
  );
  const { mutate: deleteMutate, isPending: deleteProcess } =
    useDeleteAccount(id);

  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: '' };

  const handleSubmit = (values: FormValues) => {
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              This action allows you to edit the account details.
            </SheetDescription>
          </SheetHeader>
          {accountQuery.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={(values) => handleSubmit(values)}
              disable={isPending || deleteProcess}
              defaultValues={defaultValues}
              onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditSheetAccount;
