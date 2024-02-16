import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Arg, buildSchema, Mutation, Query, Resolver, Field as GqlField, } from 'type-graphql';
// import { HelloModel } from './models/HelloModel';
import { getModelForClass } from '@typegoose/typegoose';
import { connectDB } from './config/DBConfig';
import { prop as DbField, modelOptions } from '@typegoose/typegoose';

async function startServer() {
  const app = express();
  await connectDB();

  class Hello {
    @DbField()
    @GqlField()
    message!: string;
  }
  
  const HelloModel = getModelForClass(Hello);
  
  @Resolver()
  class HelloResolver {
    @Query(() => [Hello])
    async hello() {
      const helloData = await HelloModel.find();
      return helloData ? helloData : 'Hello world!';
    }

    @Mutation(() => Hello)
    async createHelloMessage(@Arg('message') message: string) {
      const hello = await HelloModel.create({ message });
      return hello.message;
    }
  }

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  // Create an ApolloServer instance with your schema
  const server = new ApolloServer({ schema });

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
