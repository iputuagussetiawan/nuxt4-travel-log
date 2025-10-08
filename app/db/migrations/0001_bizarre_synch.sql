ALTER TABLE "locationLogImage" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "locationLogImage" CASCADE;--> statement-breakpoint
ALTER TABLE "location" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locationLog" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "location" ADD CONSTRAINT "location_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locationLog" ADD CONSTRAINT "locationLog_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;