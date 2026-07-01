import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const urls = pgTable(
	"urls",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		originalUrl: text("original_url").notNull(),
		shortUrl: text("short_url").notNull().unique(),
		totalAccess: integer("total_access").default(0),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		deletedAt: timestamp("deleted_at"),
	},
	(table) => [index("short_url_idx").on(table.shortUrl)],
);
