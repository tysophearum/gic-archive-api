import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { connectDB } from './config/DBConfig';
import Resolvers from './resolvers';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import uploadRouter from './controllers/uploadController';
import cors from 'cors';

async function startServer() {
  const app = express();
  app.use(cors());
  // Use graphqlUploadExpress for handling GraphQL file uploads
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));

  await connectDB();

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: Resolvers as any,
  });

  // Create an ApolloServer instance with your schema
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return req.headers;
    },
  });

  await server.start();
  // Apply the Apollo middleware to Express
  server.applyMiddleware({ app });

  // Mount the upload router
  app.use('/upload', uploadRouter);

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
