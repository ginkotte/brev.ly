ALTER TABLE "urls" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
CREATE INDEX "short_url_idx" ON "urls" USING btree ("short_url");