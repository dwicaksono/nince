'use client';
import React, { useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useGetOneMock } from '@/features/interview/hooks/useGetOneMock';
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DetailPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const mockId = params?.mockId as string;
  const { data } = useGetOneMock(mockId);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Started the mock</h2>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-x-2 rounded-lg border p-4">
          <h2>
            <strong>Job position</strong>: {data?.jobPosition}
          </h2>
          <h2>
            <strong>Job description</strong>: {data?.jobDescription}
          </h2>
          <h2>
            <strong>Experience</strong>: {data?.jobExperience}
          </h2>

          <div className="my-4 rounded-lg border border-yellow-600 bg-yellow-100 p-4 text-yellow-600">
            <p>information about the mock interview.</p>.
            <p>
              Enable video web cam and microphone to start your ai generated
              mock intevriew.it has 5 question which you can answer and at the
              last ypu will get the report on the basis of your answer.Note: we
              never record ypur video, web cam access you can disable at any
              time if you want
            </p>
          </div>
        </div>

        <div>
          {isWebcamOn ? (
            <Webcam
              mirrored
              onUserMedia={() => setIsWebcamOn(true)}
              onUserMediaError={() => setIsWebcamOn(false)}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full rounded-lg border bg-secondary p-20" />
              <Button
                variant="ghost"
                className="text-semibold mt-2 w-full"
                onClick={() => setIsWebcamOn(true)}
              >
                Enable your camera and microphone
              </Button>

              <Button
                className="w-full bg-blue-800 bg-gradient-to-r from-blue-500"
                size="lg"
                onClick={() => push(`${pathname}/start`)}
              >
                Start Interview
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
