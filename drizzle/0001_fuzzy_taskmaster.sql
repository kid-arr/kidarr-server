ALTER TABLE "child" ALTER COLUMN "id" SET DEFAULT gen_random_uuid
      ();--> statement-breakpoint
ALTER TABLE "device" ALTER COLUMN "expires" SET DEFAULT now
        ()
        + interval '1 hour';--> statement-breakpoint
ALTER TABLE "ping" ALTER COLUMN "location_x" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "ping" ALTER COLUMN "location_y" SET DATA TYPE double precision;