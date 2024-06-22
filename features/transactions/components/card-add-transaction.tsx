'use client';
import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { useSheetTransaction } from '../hooks/useSheetTransaction';

type Props = {
  children: React.ReactNode;
};

const CardAddTransaction: FC<Props> = ({ children }) => {
  const { onOpen } = useSheetTransaction();

  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">
          Transction History
        </CardTitle>
        <Button className="gap-x-2" size="sm" onClick={onOpen}>
          <PlusCircle className="size-4 text-white" />
          Add Transaction
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardAddTransaction;
