import { CreateThesisInput, ListThesisResponse, User, UpdateThesisInput, ThesisResponse, MinThesis } from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import {
  createThesisAction,
  listThesisAction,
  getThesisAction,
  deleteThesisAction,
  updateThesisAction,
  updateThesisApprovalAction,
} from '../../controllers/thesis';
import { PaginationInput } from '../../typeDefs';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import OptionalMiddleware from '../../middleware/OptionalMiddleware';
import TeacherMiddleware from '../../middleware/TeacherMiddleware';
import AdminMiddleware from '../../middleware/AdminMiddleware';

@Resolver()
export class ThesisResolver {
  @Mutation(() => ThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async createThesis(
    @Arg('thesis') thesis: CreateThesisInput,
    @Ctx() { user }: any,
  ) {
    return await createThesisAction(user, thesis);
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(AdminMiddleware)
  async listThesis(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    const a = await listThesisAction(user, pager, {});
    return a;
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
  async listApprovedThesis(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: true,
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
  async listApprovedThesisByCategory(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Arg('categoryId', () => String, { nullable: true }) categroyId: string,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: true,
      category: categroyId
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async listMyApprovedThesis(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: true,
      user: user._id
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async listMyUnapprovedThesis(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: false,
      user: user._id
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(AdminMiddleware)
  async listUnapprovedThesis(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: false,
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(TeacherMiddleware)
  async listUnapprovedThesisByTeacherId(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: false,
      teacher: user._id
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(TeacherMiddleware)
  async listApprovedThesisByTeacherId(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      isApproved: true,
      teacher: user._id
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
  async listThesisByUser(
    @Arg('userId', () => String, { nullable: false }) userId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      user: userId,
      isApproved: true,
    });
  }

  @Query(() => ThesisResponse)
  async getThesisById(@Arg('thesisId', () => String, { nullable: false }) id: string) {
    return await getThesisAction(id);
  }

  @Mutation(() => Boolean)
  async deleteThesis(@Arg('thesisId', () => String, { nullable: false }) id: string) {
    return await deleteThesisAction(id);
  }

  @Mutation(() => ThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async updateThesis(
    @Arg('thesis') thesis: UpdateThesisInput,
    @Ctx() { user }: any,
  ) {
    return await updateThesisAction(user, thesis);
  }

  @Mutation(() => ThesisResponse)
  @UseMiddleware(TeacherMiddleware)
  async updateThesisApproval(
    @Arg('thesisId') id: string,
    @Arg('approval') approval: boolean,
  ) {
    return await updateThesisApprovalAction(id, approval);
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
  async searchApprovedThesis(
    @Arg('title') title: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listThesisAction(user, pager, {
      title: { $regex: title, $options: 'i' }, 
      isApproved: true,
    });
  }
  
  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
  async searchThesis(
    @Arg('title') title: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    const thesis = await listThesisAction(user, pager, { title: { $regex: title, $options: 'i' }, isApproved: true });
    return thesis;
  }
}
