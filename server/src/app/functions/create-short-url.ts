import { and, eq, isNull } from "drizzle-orm";
import z from "zod";
import { env } from "../../env.ts";
import { db } from "../../infra/db/index.ts";
import { schema } from "../../infra/db/schemas/index.ts";
import { type Either, makeLeft, makeRight } from "../../shared/either.ts";

const shortUrlInput = z.object({
	alias: z.string(),
	originalUrl: z.url(),
});

type ShortUrlInput = z.input<typeof shortUrlInput>;

export async function createShortUrl(
	input: ShortUrlInput,
): Promise<Either<{ message: string }, { url: string, id: string }>> {
	const { alias, originalUrl } = shortUrlInput.parse(input);

	const checkDuplicate = await db
		.select({
			id: schema.urls.id,
		})
		.from(schema.urls)
		.where(
			and(
				eq(schema.urls.shortUrl, alias),
				isNull(schema.urls.deletedAt),
			),
		);

	if (checkDuplicate.length) {
		return makeLeft({ message: "URL encurtada já existe" });
	}

	const [result] = await db.insert(schema.urls).values({
		shortUrl: alias,
		originalUrl: originalUrl,
	}).returning({
		id: schema.urls.id,
	})

	return makeRight({ url: `http://localhost:${env.PORT}/${alias}`, id: result.id });
}
