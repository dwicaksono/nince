'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import Webcam from 'react-webcam';

const CameraRecord = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-secondary p-4">
      <Webcam className="z-10 size-full rounded-xl" mirrored />
      <Button
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
        size="lg"
      >
        Record Intervew
      </Button>
    </div>
  );
};

export default CameraRecord;
