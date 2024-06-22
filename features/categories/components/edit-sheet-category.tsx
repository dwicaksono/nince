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

import { useDeleteCaregory } from '../api/use-delete-category';
import { useConfirm } from '@/hooks/useConfirm';
import { useOpenCategory } from '../hooks/useOpenCategory';
import { useGetCategory } from '../api/use-get-category';
import { useEditCategory } from '../api/use-edit-category';
import { CategoryForm, FormValues } from './category-form';

const EditSheetCategory = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const categoriesQuery = useGetCategory(id);
  const { mutate, isPending } = useEditCategory(id);
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this category?',
    'Delete Category',
  );
  const { mutate: deleteMutate, isPending: deleteProcess } =
    useDeleteCaregory(id);

  const defaultValues = categoriesQuery.data
    ? { name: categoriesQuery.data.name }
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              This action allows you to edit the category details.
            </SheetDescription>
          </SheetHeader>
          {categoriesQuery.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
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

export default EditSheetCategory;
