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
import { useSheetAccount } from '@/features/accounts/hooks/useSheetAccount';
import {
  AccountForm,
  type FormValues,
} from '@/features/accounts/components/acoount-form';
import { useCreateAccount } from '../api/use-create-account';
const SheetAccount = () => {
  const { isOpen, onClose } = useSheetAccount();
  const { mutate, isPending } = useCreateAccount();

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create Account</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={(values) => handleSubmit(values)}
          disable={isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SheetAccount;
