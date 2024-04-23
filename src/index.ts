import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Arg, buildSchema, Mutation, Query, Resolver, Field as GqlField } from 'type-graphql';
import { connectDB } from './config/DBConfig';
import Resolvers from './resolvers';
import { connectAmqp } from './config/rabbitmqConfig';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function startServer() {
  const app = express();

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
  await connectDB();
  // await connectAmqp();

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: Resolvers as any,
    // validate: { forbidUnknownValues: false }
  });

  // Create an ApolloServer instance with your schema
  const server = new ApolloServer({
    schema,
    // uploads: false,
    context: ({ req }) => {
      return req.headers;
    },
  });

  await server.start();
  // Apply the Apollo middleware to Express
  server.applyMiddleware({ app });

  // Define the port to listen on
  const PORT = process.env.PORT || 4000;

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err.message);
});
