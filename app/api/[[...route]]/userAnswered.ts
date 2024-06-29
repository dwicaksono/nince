import { db } from '@/db/drizzle';
import {
  MockInterview,
  insertMockInterviewSchema,
  insertUserAnswersSchema,
  userAnswers,
} from '@/db/schema';

import { chatSession } from '@/lib/gemini';
import { currentUser } from '@clerk/nextjs/server';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono()
  .get(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid id' }, 400);
      }
      const [data] = await db
        .select({})
        .from(userAnswers)
        .where(eq(userAnswers.mockIdRef, id));

      if (!data) {
        return c.json({ error: 'No mock interview found' }, 404);
      }
      const result = {
        ...data,
      };

      return c.json({ result });
    },
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertUserAnswersSchema.pick({
        id: true,
        mockIdRef: true,
        question: true,
        answer: true,
        userId: true,
        feedback: true,
        userAnswers: true,
        rating: true,
        userEmail: true,
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
