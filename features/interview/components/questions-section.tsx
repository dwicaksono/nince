'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {
  question: string;
  answer: string;
}[];
const QuestionsSection = ({ questions }: { questions: Props }) => {
  const [activeQuestion, setActiveQuestion] = React.useState(0);
  if (!questions)
    return (
      <div className="rounded-lg border p-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  return (
    <div className="rounded-lg border p-4">
      <div className="grid grid-cols-4 gap-5">
        {questions?.map((question, index) => (
          <div
            className={cn(
              'rounded-full border py-2 text-center text-sm font-semibold',
              activeQuestion === index
                ? 'bg-fuchsia-500 text-white'
                : 'bg-white text-gray-800',
            )}
            key={index}
            onClick={() => setActiveQuestion(index)}
          >
            {`Question ${index + 1}`}
          </div>
        ))}
      </div>
      <div className="my-4 flex flex-col gap-x-2">
        <h4 className="text-sm font-bold">Question :</h4>
        <p className="text-sm">{questions[activeQuestion]?.question}</p>
      </div>
    </div>
  );
};

export default QuestionsSection;
