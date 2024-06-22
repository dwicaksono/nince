'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertAccountSchema } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const formSchema = insertAccountSchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disable?: boolean;
};

export const AccountForm = ({
  id,
  onSubmit,
  defaultValues,
  disable,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={disable} className="w-full" type="submit">
          {id ? 'save changes' : 'Create Account'}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disable}
            onClick={handleDelete}
            variant="outline"
            className="w-full gap-x-2"
          >
            <Trash className="size-4" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};
