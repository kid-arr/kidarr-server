ALTER TABLE "devices" DROP CONSTRAINT "devices_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "devices" DROP COLUMN IF EXISTS "user_id";