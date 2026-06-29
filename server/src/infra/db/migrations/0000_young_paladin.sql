CREATE TABLE "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_url" text NOT NULL,
	"total_access" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_short_url_unique" UNIQUE("short_url")
);
