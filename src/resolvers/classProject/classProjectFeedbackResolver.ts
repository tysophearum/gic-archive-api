import StudentMiddleware from '../../middleware/StudentMiddleware';
import {
  createClassProjectFeedbackAction,
  deleteClassProjectFeedbackAction,
  listClassProjectFeedbackAction,
  updateClassProjectFeedbackAction,
} from '../../controllers/classProject';
import {
  CreateClassProjectFeedbackInput,
  UpdateClassProjectFeedbackInput,
  ClassProjectFeedbackResponse,
  ListClassProjectFeedbackResponse,
} from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { PaginationInput } from '../../typeDefs';

@Resolver()
export class ClassProjectFeedbackResolver {
  @Mutation(() => ClassProjectFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async createClassProjectFeedback(@Arg('classProjectFeedback') classProjectFeedback: CreateClassProjectFeedbackInput, @Ctx() { user }: any) {
    return await createClassProjectFeedbackAction(user, classProjectFeedback);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async deleteClassProjectFeedback(@Arg('id') id: string, @Ctx() { user }: any) {
    return await deleteClassProjectFeedbackAction(user, id);
  }

  @Mutation(() => ClassProjectFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async updateClassProjectFeedback(@Arg('classProjectFeedback') classProjectFeedback: UpdateClassProjectFeedbackInput, @Ctx() { user }: any) {
    return await updateClassProjectFeedbackAction(user, classProjectFeedback);
  }

  @Query(() => ListClassProjectFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async listClassProjectFeedback(
    @Arg('documentId') classProjectId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectFeedbackAction(user, pager, { classProject: classProjectId });
  }
}
