'use client';

import CameraRecord from '@/features/interview/components/camera-record';
import QuestionsSection from '@/features/interview/components/questions-section';
import { useGetOneMock } from '@/features/interview/hooks/useGetOneMock';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StartPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const mockId = params?.mockId as string;
  const { data, isPending } = useGetOneMock(mockId);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  console.log(data?.jsonMockResponse);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <QuestionsSection questions={data?.jsonMockResponse} />

      <CameraRecord />
    </div>
  );
};

export default StartPage;
