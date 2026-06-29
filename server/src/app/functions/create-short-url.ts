import { eq } from "drizzle-orm";
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
): Promise<Either<{ message: string }, { url: string }>> {
	const { alias, originalUrl } = shortUrlInput.parse(input);

	const checkDuplicate = await db
		.select({
			id: schema.urls.id,
		})
		.from(schema.urls)
		.where(eq(schema.urls.shortUrl, alias));

	if (checkDuplicate.length) {
		return makeLeft({ message: "URL encurtada já existe" });
	}

	await db.insert(schema.urls).values({
		shortUrl: alias,
		originalUrl: originalUrl,
	});

	return makeRight({ url: `http://localhost:${env.PORT}/${alias}` });
}
