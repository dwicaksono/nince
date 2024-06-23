import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSearch } from 'lucide-react';
import React from 'react';
import AreaVariant from './area-variant';

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};
const Chart = ({ data = [] }: Props) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-xl">Transactions</CardTitle>
        {/* select */}
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-y-4">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No data this period</p>
          </div>
        ) : (
          <AreaVariant data={data} />
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
