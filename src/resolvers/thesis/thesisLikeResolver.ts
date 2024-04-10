import { createThesisLikeAction } from '../../controllers/thesis';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class ThesisLikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async likeThesis(@Arg('thesisId') thesisId: string, @Ctx() { user }: any) {
    return await createThesisLikeAction(user, thesisId);
  }
}
