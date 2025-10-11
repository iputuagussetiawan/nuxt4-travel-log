ALTER TABLE "locationLog" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "locationLog" CASCADE;--> statement-breakpoint
ALTER TABLE "location" ALTER COLUMN "lat" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "location" ALTER COLUMN "long" SET DATA TYPE integer;