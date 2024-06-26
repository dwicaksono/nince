'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertMockInterviewSchema } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { DrawerDialog } from './dialog-drawer';
import { useOpenDialog } from '../hooks/useOpenDialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useCreateQuest } from '../hooks/useCreateQuest';
import { use } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = insertMockInterviewSchema.pick({
  jobPosition: true,
  jobDescription: true,
  jobExperience: true,
});

export type FormValues = z.input<typeof formSchema>;

export const AddFormInterview = () => {
  const { push } = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const mutation = useCreateQuest();

  const { isOpen, onClose } = useOpenDialog();

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        form.reset();

        //@ts-ignore
        push(`/interview/${data.data.mockId}`);

        onClose();
      },
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <DrawerDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Add New Mock Interview"
      description="Create a new interview by selecting the type of interview and the questions you want to ask."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pt-4"
        >
          <FormField
            name="jobPosition"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Position <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    // disabled={disable}
                    placeholder="e.g. Software Engineer, Product Manager"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="jobDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Description <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Description " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="jobExperience"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Experience <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g 5 " {...field} type="number" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full gap-x-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2 className="size-4 animate-spin text-white" />
            )}{' '}
            Create
          </Button>
        </form>
        <Button
          type="button"
          onClick={handleClose}
          disabled={mutation.isPending}
        >
          Close
        </Button>
      </Form>
    </DrawerDialog>
  );
};
