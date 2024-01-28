CREATE TABLE IF NOT EXISTS "pings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"timestamp" timestamp NOT NULL,
	"device_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pings" ADD CONSTRAINT "pings_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pings" ADD CONSTRAINT "pings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
