import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { listFeaturedClassProjectAction, addFeaturedClassProjectAction, removeFeaturedClassProjectAction } from "../../controllers/classProject";
import { FeaturedClassProject, MinClassProject, MinFeaturedClassProject } from "../../entities";
import OptionalMiddleware from "../../middleware/OptionalMiddleware";
import TeacherMiddleware from "../../middleware/TeacherMiddleware";

@Resolver()
export class FeaturedClassProjectResolver {
  @Query(() => [MinClassProject])
  @UseMiddleware(OptionalMiddleware)
  async listFeaturedClassProject(
    @Ctx() { user }: any,
  ) {
    return await listFeaturedClassProjectAction(user, {});
  }

  @Mutation(() => MinFeaturedClassProject)
  async addFeaturedClassProject(
    @Arg('classProjectId', () => String, { nullable: false }) classProjectId: string,
  ) {
    return await addFeaturedClassProjectAction(classProjectId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(TeacherMiddleware)
  async removeFeaturedClassProject(
    @Arg('classProjectId', () => String, { nullable: false }) classProjectId: string,
  ) {
    return await removeFeaturedClassProjectAction(classProjectId);
  }
}