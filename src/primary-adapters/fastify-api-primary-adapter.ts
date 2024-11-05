import fastify from 'fastify';
import { JsonStoreSecondaryAdapter } from '../secondary-adapters/json-store-secondary-adapter';
import { GreetingService } from '../business/greeting-service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export default function createApp(options = {}) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  app.get('/hello', async () => {
    return { hello: 'World!' };
  });

  app.post(
    '/greet',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          additionalProperties: false,
          required: ['name'],
        },
        response: {
          201: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                greeting: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const jsonStoreSecondaryAdapter = new JsonStoreSecondaryAdapter();
      const greetingService = new GreetingService(jsonStoreSecondaryAdapter);

      const { name } = request.body;

      const result = greetingService.greet(name);

      reply.status(201).send([{ greeting: result }]);
    }
  );

  return app;
}
