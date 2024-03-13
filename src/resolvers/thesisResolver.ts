import { CreateThesisInput, ListThesisResponse } from "../entities/thesis/thesis";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Thesis } from "../entities";
import { createThesisAction, listThesisAction, listApprovedThesisAction } from "../controllers/thesis";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { PaginationInput } from "../typeDefs";
import UserMiddleware from "../middleware/UserMiddleware";

@Resolver()
export class ThesisResolver {

  @Mutation(() => Thesis)
  @UseMiddleware(UserMiddleware)
  async createThesis(
    @Arg("thesis") thesis: CreateThesisInput,
    @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Ctx() { userId }: any
  ) {
    return await createThesisAction(userId, thesis, file);
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(UserMiddleware)
  async listThesis(
    @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
  ) {
    return await listThesisAction(pager);
  }

  @Query(() => ListThesisResponse)
  async listApprovedThesis(
    @Arg("pager", () => PaginationInput, { nullable: true }) pager: PaginationInput,
  ) {
    return await listApprovedThesisAction(pager);
  }
}