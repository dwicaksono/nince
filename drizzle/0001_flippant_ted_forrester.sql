CREATE TABLE IF NOT EXISTS "userAnswers" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"question" varchar NOT NULL,
	"answer" varchar NOT NULL,
	"userId" varchar NOT NULL,
	"feedback" varchar,
	"userAnswers" varchar,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" date DEFAULT now()
);
