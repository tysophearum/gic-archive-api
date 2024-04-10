import StudentMiddleware from '../../middleware/StudentMiddleware';
import {
  createThesisFeedbackAction,
  deleteThesisFeedbackAction,
  listThesisFeedbackAction,
  updateThesisFeedbackAction,
} from '../../controllers/thesis';
import {
  CreateThesisFeedbackInput,
  UpdateThesisFeedbackInput,
  ThesisFeedbackResponse,
  ListThesisFeedbackResponse,
} from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { PaginationInput } from '../../typeDefs';

@Resolver()
export class ThesisFeedbackResolver {
  @Mutation(() => ThesisFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async createThesisFeedback(@Arg('thesisFeedback') thesisFeedback: CreateThesisFeedbackInput, @Ctx() { user }: any) {
    return await createThesisFeedbackAction(user, thesisFeedback);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(StudentMiddleware)
  async deleteThesisFeedback(@Arg('id') id: string, @Ctx() { user }: any) {
    return await deleteThesisFeedbackAction(user, id);
  }

  @Mutation(() => ThesisFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async updateThesisFeedback(@Arg('thesisFeedback') thesisFeedback: UpdateThesisFeedbackInput, @Ctx() { user }: any) {
    return await updateThesisFeedbackAction(user, thesisFeedback);
  }

  @Query(() => ListThesisFeedbackResponse)
  @UseMiddleware(StudentMiddleware)
  async listThesisFeedback(
    @Arg('thesisId') thesisId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisFeedbackAction(user, pager, { thesis: thesisId });
  }
}
