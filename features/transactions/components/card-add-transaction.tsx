'use client';
import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Upload } from 'lucide-react';
import { useSheetTransaction } from '../hooks/useSheetTransaction';
import { useCSVReader } from 'react-papaparse';

type Props = {
  children: React.ReactNode;
  onUpload: (result: any) => void;
};

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  erorr: [],
  meta: {},
};

const CardAddTransaction: FC<Props> = ({ onUpload, children }) => {
  const { CSVReader } = useCSVReader();
  const { onOpen } = useSheetTransaction();

  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">
          Transction History
        </CardTitle>
        <div className="item-center flex flex-col gap-2 lg:flex-row">
          <Button className="gap-x-2" size="sm" onClick={onOpen}>
            <PlusCircle className="size-4 text-white" />
            Add Transaction
          </Button>
          <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
              <Button
                size="sm"
                className="w-full gap-x-2 lg:w-auto"
                {...getRootProps()}
              >
                <Upload className="size-4" /> import
              </Button>
            )}
          </CSVReader>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardAddTransaction;
