import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { redirectUrl } from "../../../app/functions/redirect-to-original-url.ts";
import { isRight, unwrapEither } from "../../../shared/either.ts";

export const redirectToOriginalUrlRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.get(
		"/url",
		{
			schema: {
				summary: "Redirect to original URL",
				tags: ["urls"],
				querystring: z.object({
					id: z.uuidv7(),
				}),
				response: {
					200: z.object({ url: z.string() }),
					404: z.object({ error: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.query;

			const result = await redirectUrl({
				id,
			});

			if (isRight(result)) {
				return reply.status(200).send({ url: result.right.url })
			}

			const error = unwrapEither(result);
			return reply.status(404).send({ error: error.message });
		},
	);
};
