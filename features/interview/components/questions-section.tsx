'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, Volume2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type Props = {
  questions: { question: string; answer: string }[];
  activeQuestion: number;
  setActiveIndex: (index: number) => void;
};
const QuestionsSection = ({
  questions,
  activeQuestion,
  setActiveIndex,
}: Props) => {
  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      const speakText = () => {
        const voices = synth.getVoices();
        const selectedVoice = voices.find(
          (voices) => voices.name === 'Google UK English   ',
        );
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.lang = 'en-US';
        utterance.voice = selectedVoice || voices[0];
        synth.speak(utterance);
      };

      if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = speakText;
      } else {
        speakText();
      }
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="grid grid-cols-4 gap-5">
        {questions?.map((_, index) => (
          <Button
            className={cn(
              'rounded-full border py-2 text-center text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-fuchsia-500 hover:text-white',
              activeQuestion === index
                ? 'bg-fuchsia-500 text-white'
                : 'bg-white text-gray-800',
            )}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {`Question ${index + 1}`}
          </Button>
        ))}
      </div>
      <div className="my-4 flex flex-col gap-x-2">
        <h4 className="text-sm font-bold">Question :</h4>
        <p className="text-sm">{questions[activeQuestion]?.question}</p>
        <Button
          variant="ghost"
          size="lg"
          className="my-2 w-fit border px-2"
          onClick={() => handleSpeech(questions[activeQuestion]?.question)}
        >
          <Volume2 className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionsSection;
