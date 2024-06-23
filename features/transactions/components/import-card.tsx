import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImportTable from './import-table';
import { boolean } from 'drizzle-orm/mysql-core';
import { converAmountToMiliunits } from '@/lib/utils';
import { format, parse } from 'date-fns';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const outputDateFormat = 'yyyy-MM-dd';

const requiredFields = ['date', 'payee', 'amount'];

interface SelectedColumnsState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmmit: (data: any) => void;
};

const ImportCard = ({ data, onCancel, onSubmmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }
      if (value === 'skip') {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.keys(selectedColumns).filter(boolean).length;
  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };
    const mappedDate = {
      headers: headers.map((header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });
          return transformedRow.every((cell) => cell === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };
    const arrayData = mappedDate.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedDate.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });
    const fromatData = arrayData.map((row) => ({
      ...row,
      amount: converAmountToMiliunits(parseFloat(row.amount)),
      date: format(parse(row.date, dateFormat, new Date()), outputDateFormat),
    }));
    onSubmmit(fromatData);
  };
  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">
          Import Transaction
        </CardTitle>
        <div className="item-center flex flex-col gap-2 lg:flex-row">
          <Button className="gap-x-2" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={progress < requiredFields.length}
            onClick={handleContinue}
          >
            Continue ({progress}/{requiredFields.length})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ImportTable
          headers={headers}
          body={body}
          selectedColumns={selectedColumns}
          onTableHeadSelectChange={onTableHeadSelectChange}
        />
      </CardContent>
    </Card>
  );
};

export default ImportCard;
