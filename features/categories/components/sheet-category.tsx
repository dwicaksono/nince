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

import { useCreateCategory } from '../api/use-create-category';
import { useSheetAddCategory } from '../hooks/useAddCategory';
import { CategoryForm, type FormValues } from './category-form';
const SheetCategory = () => {
  const { isOpen, onClose } = useSheetAddCategory();
  const { mutate, isPending } = useCreateCategory();

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
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={(values) => handleSubmit(values)}
          disable={isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SheetCategory;
