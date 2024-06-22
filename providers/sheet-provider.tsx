'use client';

import EditSheetAccount from '@/features/accounts/components/edit-sheet-account';
import SheetAccount from '@/features/accounts/components/sheet-account';
import React from 'react';
import { useMountedState } from 'react-use';

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <SheetAccount />
      <EditSheetAccount />
    </>
  );
};
