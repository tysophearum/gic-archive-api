import { CreateThesisInput, ListThesisResponse, User, UpdateThesisInput, ThesisResponse } from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import {
  createThesisAction,
  listThesisAction,
  getThesisAction,
  deleteThesisAction,
  updateThesisAction,
  updateThesisApprovalAction,
} from '../../controllers/thesis';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { PaginationInput } from '../../typeDefs';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import OptionalMiddleware from '../../middleware/OptionalMiddleware';
import TeacherMiddleware from '../../middleware/TeacherMiddleware';

@Resolver()
export class ThesisResolver {
  @Mutation(() => ThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async createThesis(
    @Arg('thesis') thesis: CreateThesisInput,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { user }: any,
  ) {
    return await createThesisAction(user, thesis, image);
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
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
      thesisCategory: categroyId
    });
  }

  @Query(() => ListThesisResponse)
  @UseMiddleware(OptionalMiddleware)
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
  @UseMiddleware(OptionalMiddleware)
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
  @UseMiddleware(OptionalMiddleware)
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
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { user }: any,
  ) {
    return await updateThesisAction(user, thesis, file, image);
  }

  @Mutation(() => ThesisResponse)
  @UseMiddleware(TeacherMiddleware)
  async updateThesisApproval(
    @Arg('thesisId') id: string,
    @Arg('approval') approval: boolean,
  ) {
    return await updateThesisApprovalAction(id, approval);
  }
}
