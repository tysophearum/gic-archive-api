import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Hello } from '../entities';
import { getModelForClass } from '@typegoose/typegoose';
import { createHelloAction, getAllHellosAction } from '../controllers/hello';
import testMiddleware from '../middleware/testMiddleware';

const HelloModel = getModelForClass(Hello);

@Resolver()
export class HelloResolver {
  @Query(() => [Hello])
  async getAllHello() {
    return await getAllHellosAction();
  }

  @Mutation(() => Hello)
  @UseMiddleware(testMiddleware)
  async createHelloMessage(@Arg('message') message: string) {
    return await createHelloAction({message});
  }
}
