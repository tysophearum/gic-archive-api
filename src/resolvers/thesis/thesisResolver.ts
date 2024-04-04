import { CreateThesisInput, ListThesisResponse, Thesis, UpdateThesisInput, ThesisResponse } from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import {
  createThesisAction,
  listThesisAction,
  getThesisAction,
  deleteThesisAction,
  updateThesisAction
} from '../../controllers/thesis';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { PaginationInput } from '../../typeDefs';
import StudentMiddleware from '../../middleware/StudentMiddleware';

@Resolver()
export class ThesisResolver {
  @Mutation(() => ThesisResponse)
  @UseMiddleware(StudentMiddleware)
  async createThesis(
    @Arg('thesis') thesis: CreateThesisInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { userId }: any,
  ) {
    return await createThesisAction(userId, thesis, file, image);
  }

  @Query(() => ListThesisResponse)
  async listThesis(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listThesisAction(pager, {});
  }

  @Query(() => ListThesisResponse)
  async listApprovedThesis(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listThesisAction(pager, {
      isApproved: true,
    });
  }

  @Query(() => ListThesisResponse)
  async listUnapprovedThesis(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listThesisAction(pager, {
      isApproved: false,
    });
  }

  @Query(() => ListThesisResponse)
  async listUserThesis(
    @Arg('userId', () => String, { nullable: false }) userId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput
  ) {
    return await listThesisAction(pager, {
      user: userId,
      isApproved: true,
    });
  }

  @Query(() => ThesisResponse)
  async getThesisById(@Arg('id', () => String, { nullable: false }) id: string) {
    return await getThesisAction(id);
  }

  @Mutation(() => Boolean)
  async deleteThesis(@Arg('id', () => String, { nullable: false }) id: string) {
    return await deleteThesisAction(id);
  }

  @Mutation(() => ThesisResponse)
  @UseMiddleware(StudentMiddleware)
   async updateThesis(
    @Arg('thesis') thesis: UpdateThesisInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { userId }: any,
  ) {
    return await updateThesisAction(userId, thesis, file, image);
  }
}
