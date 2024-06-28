'use client';

import CameraRecord from '@/features/interview/components/camera-record';
import QuestionsSection from '@/features/interview/components/questions-section';
import { useGetOneMock } from '@/features/interview/hooks/useGetOneMock';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const StartPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const mockId = (params?.mockId as string) ?? '';
  const dataMock = useGetOneMock(mockId);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [isWebcamOn, setIsWebcamOn] = useState(false);
  // const dataSources = data?.jsonMockResponse.questions_and_answers;
  if (dataMock.isPending) return <div>Loading...</div>;
  if (dataMock.isError) {
    toast.error('Failed to fetch mock interview data');
    return null;
  }
  if (!dataMock.data) {
    toast.error('No mock interview found');
    return null;
  }
  const data = dataMock.data.jsonMockResponse;
  console.log(data, '????');
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <QuestionsSection
        questions={data.questions_and_answers}
        activeQuestion={activeQuestion}
        setActiveIndex={(idx) => setActiveQuestion(idx)}
      />
      <CameraRecord />
    </div>
  );
};

export default StartPage;
