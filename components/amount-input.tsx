import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Button } from './ui/button';

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};
const AmountInput = ({ onChange, value, disabled, placeholder }: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;
  const onReverseValue = () => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={onReverseValue}
              className={cn(
                'absolute left-1.5 top-1.5 flex h-0 items-center justify-center rounded-md bg-slate-400 px-2 py-3 transition hover:bg-slate-500',
                isIncome && 'bg-green-500',
                isExpense && 'bg-red-500',
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            USe [+] to add income and [-] to add expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        placeholder={placeholder}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background p-4 pl-10 pr-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isIncome && 'text-green-500',
          isExpense && 'text-red-500',
        )}
        prefix="$"
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        value={value}
        disabled={disabled}
      />
      <p
        className={cn(
          'mt-2 text-xs',
          isIncome && 'text-green-500',
          isExpense && 'text-red-500',
        )}
      >
        {isIncome && 'This will count as income'}
        {isExpense && 'This will count as expense'}
      </p>
    </div>
  );
};

export default AmountInput;
