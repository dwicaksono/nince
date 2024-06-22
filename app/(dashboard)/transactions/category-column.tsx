'use client';
import { useOpenCategory } from '@/features/categories/hooks/useOpenCategory';
import React from 'react';

const CategoryColumn = ({ id, title }: { id: string; title: string }) => {
  const { onOpen } = useOpenCategory();
  const handleAccount = () => {
    if (!id) return;
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

export default CategoryColumn;
