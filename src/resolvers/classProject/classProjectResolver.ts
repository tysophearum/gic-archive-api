import { CreateClassProjectInput, ListClassProjectResponse, User, UpdateClassProjectInput, ClassProjectResponse } from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import {
  createClassProjectAction,
  listClassProjectAction,
  getClassProjectAction,
  deleteClassProjectAction,
  updateClassProjectAction,
} from '../../controllers/classProject';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { PaginationInput } from '../../typeDefs';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import OptionalMiddleware from '../../middleware/optionalMiddleware';

@Resolver()
export class ClassProjectResolver {
  @Mutation(() => ClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async createClassProject(
    @Arg('classProject') classProject: CreateClassProjectInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { user }: any,
  ) {
    return await createClassProjectAction(user, classProject, file, image);
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async listClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    const a = await listClassProjectAction(user, pager, {});
    return a;
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async listApprovedClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: true,
    });
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async listUnapprovedClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: false,
    });
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async listClassProjectByUser(
    @Arg('userId', () => String, { nullable: false }) userId: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      user: userId,
      isApproved: true,
    });
  }

  @Query(() => ClassProjectResponse)
  async getClassProjectById(@Arg('id', () => String, { nullable: false }) id: string) {
    return await getClassProjectAction(id);
  }

  @Mutation(() => Boolean)
  async deleteClassProject(@Arg('id', () => String, { nullable: false }) id: string) {
    return await deleteClassProjectAction(id);
  }

  @Mutation(() => ClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async updateClassProject(
    @Arg('classProject') classProject: UpdateClassProjectInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload | null,
    @Ctx() { user }: any,
  ) {
    return await updateClassProjectAction(user, classProject, file, image);
  }
}
