import { type ClassValue, clsx } from 'clsx';
import { eachDayOfInterval, isSameDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function converAMountFromMiliunits(amount: number) {
  return amount / 1000;
}
export function converAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function fillMissingdays(
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });
  const transactionsByDay = allDays.map((day) => {
    const dayData = activeDays.find((d) => isSameDay(d.date, day));
    if (dayData) {
      return dayData;
    }
    return { date: day, income: 0, expenses: 0 };
  });
  return transactionsByDay;
}
