'use client';
import { Button } from '@/components/ui/button';
import { Mic2, WebcamIcon } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';

type recordItem = {
  transcript: string;
  timestamp: number;
};
function concatTranscripts(data: recordItem[]): string {
  return data.map((item) => item.transcript).join(' ');
}

type Props = {
  questions: string;
  answer: string;
};

const CameraRecord = ({ questions, answer }: Props) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [userAnswer, setUserAnswer] = useState('');
  const handleRecoding = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      results.map((result) => {
        if (typeof result !== 'string') {
          setUserAnswer((prev) => prev + result.transcript);
        }
      });
    }
  }, [results]);
  console.log(results);
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-secondary p-4">
      <div className="relative flex items-center justify-center border">
        <WebcamIcon className="absolute z-10 size-10 text-white" />
        <Webcam className="absolut z-10 size-full rounded-xl" mirrored />
      </div>

      <h1>Recording: {isRecording.toString()}</h1>
      <Button
        className="w-full gap-x-2 bg-gradient-to-r from-blue-500 to-blue-700"
        size="lg"
        onClick={handleRecoding}
      >
        <Mic2 className="size-4" />
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <p>{userAnswer}q</p>
    </div>
  );
};

export default CameraRecord;
