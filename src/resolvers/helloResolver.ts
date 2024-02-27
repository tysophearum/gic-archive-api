import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Hello } from '../entities';
import { getModelForClass } from '@typegoose/typegoose';
import { createHelloAction, getAllHellosAction } from '../controllers/hello';
import testMiddleware from '../middleware/testMiddleware';

const HelloModel = getModelForClass(Hello);

@Resolver()
export class HelloResolver {
  @Query(() => [Hello])
  @UseMiddleware(testMiddleware)
  async listHello(@Ctx()context: any) {
    return await getAllHellosAction();
  }

  @Mutation(() => Hello)
  @UseMiddleware(testMiddleware)
  async createHelloMessage(@Arg('message') message: string, @Ctx()context: any) {
    return await createHelloAction(message);
  }
}
