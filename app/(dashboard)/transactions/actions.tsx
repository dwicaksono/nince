'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import { useOpenTransaction } from '@/features/transactions/hooks/useOpenTransaction';

type ActionsProps = {
  id: string;
};
const Actions = ({ id }: ActionsProps) => {
  const { onOpen } = useOpenTransaction();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => onOpen(id)}
            disabled={false}
            className="w-full cursor-pointer p-2"
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
