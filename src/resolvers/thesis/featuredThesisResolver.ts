import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { listFeaturedThesisAction, addFeaturedThesisAction, removeFeaturedThesisAction } from "../../controllers/thesis";
import { FeaturedThesis, MinThesis, MinFeaturedThesis } from "../../entities";
import OptionalMiddleware from "../../middleware/OptionalMiddleware";
import TeacherMiddleware from "../../middleware/TeacherMiddleware";

@Resolver()
export class FeaturedThesisResolver {
  @Query(() => [MinThesis])
  @UseMiddleware(OptionalMiddleware)
  async listFeaturedThesis(
    @Ctx() { user }: any,
  ) {
    return await listFeaturedThesisAction(user, {});
  }

  @Mutation(() => MinFeaturedThesis)
  async addFeaturedThesis(
    @Arg('thesisId', () => String, { nullable: false }) thesisId: string,
  ) {
    return await addFeaturedThesisAction(thesisId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(TeacherMiddleware)
  async removeFeaturedThesis(
    @Arg('thesisId', () => String, { nullable: false }) thesisId: string,
  ) {
    return await removeFeaturedThesisAction(thesisId);
  }
}