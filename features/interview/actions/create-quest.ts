'use server';

import { insertMockInterviewSchema } from '@/db/schema';
import { chatSession } from '@/lib/gemini';
import { z } from 'zod';

const createQuestionSchema = insertMockInterviewSchema.pick({
  jobPosition: true,
  jobDescription: true,
  jobExperience: true,
});

export type TCreateQuestionSchema = z.input<typeof createQuestionSchema>;

export default async function createQuestionInterview(
  payload: TCreateQuestionSchema,
) {
  try {
    const safePayload = createQuestionSchema.parse(payload);
    const { jobPosition, jobDescription, jobExperience } = safePayload;
    const input = `Given the job position of "${jobPosition}" with a description stating: "${jobDescription}", and requiring ${jobExperience} years of experience, generate five interview questions and answers. Format the output as JSON, including both questions and their corresponding answers.`;

    const result = await chatSession.sendMessage(input);
    const mockJson = JSON.parse(result.response.text());
    console.log('Mock JSON:', mockJson);
    return mockJson;
  } catch (error) {
    throw new Error('Create Questions failed' + error);
  }
}
