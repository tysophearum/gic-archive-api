import { createClassProjectLikeAction } from '../../controllers/classProject';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class ClassProjectLikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async likeClassProject(@Arg('classProjectId') classProjectId: string, @Ctx() { user }: any) {
    return await createClassProjectLikeAction(user, classProjectId);
  }
}
