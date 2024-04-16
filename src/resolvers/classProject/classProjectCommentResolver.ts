import StudentMiddleware from '../../middleware/StudentMiddleware';
import {
  createClassProjectCommentAction,
  deleteClassProjectCommentAction,
  listClassProjectCommentAction,
  updateClassProjectCommentAction,
} from '../../controllers/classProject';
import {
  CreateClassProjectCommentInput,
  UpdateClassProjectCommentInput,
  ClassProjectCommentResponse,
  ListClassProjectCommentResponse,
} from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { PaginationInput } from '../../typeDefs';

@Resolver()
export class ClassProjectCommentResolver {
  @Mutation(() => ClassProjectCommentResponse)
  @UseMiddleware(StudentMiddleware)
  async createClassProjectComment(@Arg('classProjectComment') classProjectComment: CreateClassProjectCommentInput, @Ctx() { user }: any) {
    return await createClassProjectCommentAction(user, classProjectComment);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async deleteClassProjectComment(@Arg('id') id: string, @Ctx() { user }: any) {
    return await deleteClassProjectCommentAction(user, id);
  }

  @Mutation(() => ClassProjectCommentResponse)
  @UseMiddleware(StudentMiddleware)
  async updateClassProjectComment(@Arg('classProjectComment') classProjectComment: UpdateClassProjectCommentInput, @Ctx() { user }: any) {
    return await updateClassProjectCommentAction(user, classProjectComment);
  }

  @Query(() => ListClassProjectCommentResponse)
  async listClassProjectComment(
    @Arg('classProjectId') classProjectId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
  ) {
    return await listClassProjectCommentAction(pager, {
      classProject: classProjectId,
    });
  }
}
