import { asc, count, desc, ilike } from "drizzle-orm";
import z from "zod";
import { db } from "../../infra/db/index.ts";
import { schema } from "../../infra/db/schemas/index.ts";
import { type Either, makeRight } from "../../shared/either.ts";

const getUrlsInput = z.object({
	searchQuery: z.string().optional(),
	sortBy: z.enum(["createdAt"]).optional(),
	sortDirection: z.enum(["asc", "desc"]).optional(),
	page: z.number().optional().default(1),
	pageSize: z.number().optional().default(20),
});

type GetUrlsInput = z.input<typeof getUrlsInput>;

type GetUrlsOutput = {
	urls: {
		id: string;
		originalUrl: string;
		shortUrl: string;
		totalAccess: number | null;
		createdAt: Date;
	}[];
	total: number;
};

export async function getUrls(
	input: GetUrlsInput,
): Promise<Either<never, GetUrlsOutput>> {
	const { page, pageSize, searchQuery, sortBy, sortDirection } =
		getUrlsInput.parse(input);

	const [urls, [{ total }]] = await Promise.all([
		db
			.select({
				id: schema.urls.id,
				originalUrl: schema.urls.originalUrl,
				shortUrl: schema.urls.shortUrl,
				totalAccess: schema.urls.totalAccess,
				createdAt: schema.urls.createdAt,
			})
			.from(schema.urls)
			.where(
				searchQuery
					? ilike(schema.urls.originalUrl, `%${searchQuery}%`)
					: undefined,
			)
			.orderBy((fields) => {
				if (sortBy && sortDirection === "asc") {
					return asc(fields[sortBy]);
				}

				if (sortBy && sortDirection === "desc") {
					return desc(fields[sortBy]);
				}

				return desc(fields.id);
			})
			.offset((page - 1) * pageSize)
			.limit(pageSize),

		db
			.select({ total: count(schema.urls.id) })
			.from(schema.urls)
			.where(
				searchQuery
					? ilike(schema.urls.originalUrl, `%${searchQuery}%`)
					: undefined,
			),
	]);

	return makeRight({ urls, total });
}
