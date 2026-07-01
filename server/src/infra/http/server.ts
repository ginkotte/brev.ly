import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "../../env.ts";
import { createShortUrlRoute } from "./routes/create-short-url.ts";
import { deleteUrlRoute } from "./routes/delete-url.ts";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	console.error(error);

	return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*" });

// Routes
server.register(createShortUrlRoute);
server.register(deleteUrlRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server running!");
});
