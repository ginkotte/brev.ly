import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteUrl } from "../../../app/functions/delete-url.ts";
import { isRight, unwrapEither } from "../../../shared/either.ts";

export const deleteUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/url",
		{
			schema: {
				summary: "Delete short URL",
				tags: ["urls"],
				querystring: z.object({
					id: z.uuidv7(),
				}),
				response: {
					204: z.object({ id: z.uuidv7() }),
					404: z.object({ error: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.query;

			const result = await deleteUrl({
				id,
			});

			if (isRight(result)) {
				return reply.status(204).send({ id });
			}

			const error = unwrapEither(result);
			return reply.status(404).send({ error: error.message });
		},
	);
};
