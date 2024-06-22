'use client';
import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';
import React from 'react';

const AccountColumn = ({ id, title }: { id: string; title: string }) => {
  const { onOpen } = useOpenAccount();
  const handleAccount = () => {
    onOpen(id);
  };
  return (
    <div
      className="cursor-pointer text-sm hover:underline"
      onClick={handleAccount}
    >
      <span>{title}</span>
    </div>
  );
};

export default AccountColumn;
