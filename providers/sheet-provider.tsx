'use client';

import EditSheetAccount from '@/features/accounts/components/edit-sheet-account';
import SheetAccount from '@/features/accounts/components/sheet-account';
import EditSheetCategory from '@/features/categories/components/edit-sheet-category';
import SheetCategory from '@/features/categories/components/sheet-category';
import { AddFormInterview } from '@/features/interview/components/add-form-mock';
import EditSheetTransaction from '@/features/transactions/components/edit-sheet-transaction';
import SheetTransaction from '@/features/transactions/components/sheet-transaction';
import React from 'react';
import { useMountedState } from 'react-use';

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <SheetAccount />
      <EditSheetAccount />
      <SheetCategory />
      <EditSheetCategory />
      <SheetTransaction />
      <EditSheetTransaction />

      {/* dialog drawer */}
      <AddFormInterview />
    </>
  );
};
