import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import z from "zod";
import { env } from "../../env.ts";
import { db, pg } from "../../infra/db/index.ts";
import { schema } from "../../infra/db/schemas/index.ts";
import { uploadFileToStorage } from "../../infra/storage/uploat-file-to-storage.ts";
import { type Either, makeRight } from "../../shared/either.ts";

const BASE_URL = `http://localhost:${env.PORT}`;

const exportUrlsInput = z.object({
	searchQuery: z.string().optional(),
});

type ExportUrlsInput = z.input<typeof exportUrlsInput>;

type ExportUrlsOutput = {
	reportUrl: string;
};

export async function exportUrls(
	input: ExportUrlsInput,
): Promise<Either<never, ExportUrlsOutput>> {
	const { searchQuery } = exportUrlsInput.parse(input);

	const { sql, params } = db
		.select({
			id: schema.urls.id,
			originalUrl: schema.urls.originalUrl,
			shortUrl: schema.urls.shortUrl,
			totalAccess: schema.urls.totalAccess,
			createdAt: schema.urls.createdAt,
			deletedAt: schema.urls.deletedAt,
		})
		.from(schema.urls)
		.where(
			searchQuery
				? ilike(schema.urls.originalUrl, `%${searchQuery}%`)
				: undefined,
		)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(50);

	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "original_url", header: "ORIGINAL_URL" },
			{ key: "short_url", header: "SHORT_URL" },
			{ key: "total_access", header: "TOTAL_ACCESS" },
			{ key: "created_at", header: "Uploaded at" },
			{ key: "deleted_at", header: "Deleted at" },
		],
	});

	const uploadToStorageStream = new PassThrough();

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _encoding, callback) {
				for (const chunk of chunks as Record<string, unknown>[]) {
					console.log(chunks);
					this.push({
						...chunk,
						short_url: `${BASE_URL}/${chunk.short_url}`,
					});
				}

				callback();
			},
		}),
		csv,
		uploadToStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "downloads",
		fileName: `${new Date().toISOString()}-uploads.csv`,
		contentStream: uploadToStorageStream,
	});

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

	return makeRight({ reportUrl: url });
}
