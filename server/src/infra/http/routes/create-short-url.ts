import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createShortUrl } from "../../../app/functions/create-short-url.ts";
import { isRight, unwrapEither } from "../../../shared/either.ts";

export const createShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/url",
		{
			schema: {
				summary: "Create short URL",
				tags: ["urls"],
				body: z.object({
					alias: z.string(),
					originalUrl: z.url(),
				}),
				response: {
					201: z.object({ url: z.url() }).describe("URL shortened"),
					400: z.object({ error: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { alias, originalUrl } = request.body;

			const result = await createShortUrl({
				alias,
				originalUrl,
			});

			if (isRight(result)) {
				return reply.status(201).send({
					url: result.right.url,
				});
			}

			const error = unwrapEither(result);
			return reply.status(400).send({ error: error.message });
		},
	);
};
