import { db } from '@/db/drizzle';
import { MockInterview, insertMockInterviewSchema } from '@/db/schema';

import { chatSession } from '@/lib/gemini';
import { currentUser } from '@clerk/nextjs/server';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { Hono } from 'hono';

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const data = await db
      .select({
        id: MockInterview.mockId,
        jobPosition: MockInterview.jobPosition,
        jobDescription: MockInterview.jobDescription,
        jobExperience: MockInterview.jobExperience,
        jsonMockResponse: MockInterview.jsonMockResponse,
        createdBy: MockInterview.createdBy,
        createdAt: MockInterview.createdAt,
      })
      .from(MockInterview);
    if (!data) {
      return c.json({ error: 'No mock interviews found' }, 404);
    }

    return c.json({ data });
  })
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertMockInterviewSchema.pick({
        jobPosition: true,
        jobDescription: true,
        jobExperience: true,
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');
      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
      const { jobPosition, jobDescription, jobExperience } = values;
      const input = `Given the job position of "${jobPosition}" with a description stating: "${jobDescription}", and requiring ${jobExperience} years of experience, generate five interview questions and answers. Format the output as JSON, including both questions and their corresponding answers.`;

      const result = await chatSession.sendMessage(input);

      if (!result || !result.response) {
        return c.json({ error: 'Failed to create mock interview' }, 500);
      }
      const userExisting = await currentUser();
      if (!userExisting) {
        return c.json({ error: 'User not found' }, 404);
      }
      const mockJson = result.response.text();
      const [data] = await db
        .insert(MockInterview)
        .values({
          ...values,
          id: createId(),
          jsonMockResponse: mockJson,
          createdBy: userExisting?.primaryEmailAddress?.emailAddress,
          mockId: createId(),
        })
        .returning({ mockId: MockInterview.mockId });

      return c.json({ data });
    },
  );

export default app;
