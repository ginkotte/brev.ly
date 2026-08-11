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
import { exportUrlsRoute } from "./routes/export-urls.ts";
import { getUrlsRoute } from "./routes/get-urls.ts";
import { redirectToOriginalUrlRoute } from "./routes/redirect-to-original-url.ts";

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

	return reply.status(500).send({
		message: "Internal server error.",
	});
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Routes
server.register(createShortUrlRoute);
server.register(deleteUrlRoute);
server.register(redirectToOriginalUrlRoute);
server.register(getUrlsRoute);
server.register(exportUrlsRoute);

server.listen({
	port: env.PORT,
	host: "0.0.0.0",
}).then(() => {
	console.log("HTTP server running!");
});