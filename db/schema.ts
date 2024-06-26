import {
  pgTable,
  text,
  integer,
  timestamp,
  varchar,
  serial,
  date,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('pladId'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});
export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));
export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaidId: text('pladId'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));
export const insertCategoriesSchema = createInsertSchema(categories);

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  notes: text('notes'),
  date: timestamp('date', { mode: 'date' }).notNull(),
  accountId: text('account_id')
    .references(() => accounts.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
});
export const transactionsRelations = relations(transactions, ({ one }) => ({
  accounts: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
export const insertTransactionsSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});

export const MockInterview = pgTable('mockInterview', {
  id: text('id').primaryKey(),
  jsonMockResponse: text('jsonMockResponse').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDescription: varchar('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy'),
  createdAt: date('createdAt').defaultNow(),
  mockId: varchar('mockId').notNull(),
});
export const insertMockInterviewSchema = createInsertSchema(MockInterview);

export const userAnswers = pgTable('userAnswers', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  answer: varchar('answer').notNull(),
  userId: varchar('userId').notNull(),
  feedback: varchar('feedback'),
  userAnswers: varchar('userAnswers'),
  rating: varchar('rating'),
  userEmail: varchar('userEmail'),
  createdAt: date('createdAt').defaultNow(),
});
export const insertUserAnswersSchema = createInsertSchema(userAnswers);
