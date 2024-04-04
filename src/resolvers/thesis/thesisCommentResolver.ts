import StudentMiddleware from "../../middleware/StudentMiddleware";
import { createThesisCommentAction, deleteThesisCommentAction, listThesisCommentAction, updateThesisCommentAction } from "../../controllers/thesis";
import { CreateThesisCommentInput, UpdateThesisCommentInput, ThesisCommentResponse, ListThesisCommentResponse } from "../../entities";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { PaginationInput } from "../../typeDefs";

@Resolver()
export class ThesisCommentResolver {
  @Mutation(() => ThesisCommentResponse)
  @UseMiddleware(StudentMiddleware)
  async createThesisComment(
    @Arg('thesisComment') thesisComment: CreateThesisCommentInput,
    @Ctx() { userId }: any,
  ) {
    return await createThesisCommentAction(userId ,thesisComment);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async deleteThesisComment(
    @Arg('id') id: string,
    @Ctx() { userId }: any,
  ) {
    return await deleteThesisCommentAction(userId ,id);
  }

  @Mutation(() => ThesisCommentResponse)
  @UseMiddleware(StudentMiddleware)
  async updateThesisComment(
    @Arg('thesisComment') thesisComment: UpdateThesisCommentInput,
    @Ctx() { userId }: any,
  ) {
    return await updateThesisCommentAction(userId, thesisComment);
  }

  @Query(() => ListThesisCommentResponse)
  async listThesisComment(
    @Arg('thesisId') thesisId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput
  ) {
    return await listThesisCommentAction(pager, {
      thesis: thesisId,
    });
  }
}