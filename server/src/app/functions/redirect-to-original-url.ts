import { and, eq, isNull, sql } from "drizzle-orm";
import z from "zod";
import { env } from "../../env.ts";
import { db } from "../../infra/db/index.ts";
import { schema } from "../../infra/db/schemas/index.ts";
import { type Either, makeLeft, makeRight } from "../../shared/either.ts";

const redirectUrlInput = z.object({
	id: z.string(),
});

type RedirectUrlInput = z.input<typeof redirectUrlInput>;

export async function redirectUrl(
	input: RedirectUrlInput,
): Promise<Either<{ message: string }, { url: string }>> {
	const { id } = redirectUrlInput.parse(input);

	const data = await db
		.select({
			shortUrl: schema.urls.shortUrl,
		})
		.from(schema.urls)
		.where(and(eq(schema.urls.id, id), isNull(schema.urls.deletedAt)))
		.limit(1);

	if (data.length < 1) {
		return makeLeft({ message: "URL não encontrada" });
	}

	await db
		.update(schema.urls)
		.set({
			totalAccess: sql`${schema.urls.totalAccess} + 1`,
		})
		.where(eq(schema.urls.id, input.id));

	return makeRight({ url: `http://localhost:${env.PORT}/${data[0].shortUrl}` });
}
