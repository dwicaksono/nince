'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useOpenDialog } from '../hooks/useOpenDialog';
import { useGetMockInterview } from '../hooks/useGetMockInterview';

const AddNewMock = () => {
  const { onOpen } = useOpenDialog();
  const { data } = useGetMockInterview();
  console.log(data, '<<<<<<<<<');
  return (
    <div className="my-4 rounded-lg p-8">
      <h3 className="text-base font-semibold text-slate-700">
        Create a new interview
      </h3>
      <p className="text-xs text-muted-foreground">
        Create a new interview by selecting the type of interview and the
        questions you want to ask.
      </p>
      <Button size="sm" className="my-4" onClick={onOpen}>
        Create Interview
      </Button>
    </div>
  );
};

export default AddNewMock;
