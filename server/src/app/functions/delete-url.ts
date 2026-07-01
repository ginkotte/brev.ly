import { and, eq, isNull } from "drizzle-orm";
import z from "zod";
import { db } from "../../infra/db/index.ts";
import { schema } from "../../infra/db/schemas/index.ts";
import { type Either, makeLeft, makeRight } from "../../shared/either.ts";

const deleteUrlInput = z.object({
	id: z.string(),
});

type DeleteUrlInput = z.input<typeof deleteUrlInput>;

export async function deleteUrl(
	input: DeleteUrlInput,
): Promise<Either<{ message: string }, { id: string }>> {
	const { id } = deleteUrlInput.parse(input);

	const data = await db
		.select({
			id: schema.urls.id,
		})
		.from(schema.urls)
		.where(and(eq(schema.urls.id, id), isNull(schema.urls.deletedAt)))
		.limit(1);

	console.log(data);

	if (data.length < 1) {
		return makeLeft({ message: "URL não encontrada" });
	}

	await db
		.update(schema.urls)
		.set({
			deletedAt: new Date(),
		})
		.where(eq(schema.urls.id, id));

	return makeRight({ id });
}
