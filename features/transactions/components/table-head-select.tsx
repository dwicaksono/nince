import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ['amount', 'payee', 'date'];
const TableHeadSelect = ({ columnIndex, onChange, selectedColumns }: Props) => {
  const currentSelected = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelected || 'skip'}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          'border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0',
          currentSelected && 'text-blue-500',
        )}
      >
        <SelectValue placeholder="skip"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disable =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disable}
              className="capitalize"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TableHeadSelect;
