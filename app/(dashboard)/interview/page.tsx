import AddNewMock from '@/features/interview/components/add-new-mock';
import React from 'react';

const InterviewPage = () => {
  return (
    <div className="flex flex-col">
      <div className="-mt-20 w-full rounded-lg bg-white p-8 drop-shadow-md">
        <h2 className="text-xl font-semibold text-slate-700">Mock Interview</h2>
        <p className="text-xs text-muted-foreground">
          Create and start your mock interview here
        </p>
      </div>
      <AddNewMock />
    </div>
  );
};

export default InterviewPage;
