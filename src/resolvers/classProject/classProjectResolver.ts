import { CreateClassProjectInput, ListClassProjectResponse, UpdateClassProjectInput, ClassProjectResponse } from '../../entities';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import {
  createClassProjectAction,
  listClassProjectAction,
  getClassProjectAction,
  deleteClassProjectAction,
  updateClassProjectAction,
  updateClassProjectApprovalAction
} from '../../controllers/classProject';
import { PaginationInput } from '../../typeDefs';
import StudentMiddleware from '../../middleware/StudentMiddleware';
import OptionalMiddleware from '../../middleware/OptionalMiddleware';
import TeacherMiddleware from '../../middleware/TeacherMiddleware';

@Resolver()
export class ClassProjectResolver {
  @Mutation(() => ClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async createClassProject(
    @Arg('classProject') classProject: CreateClassProjectInput,
    @Ctx() { user }: any,
  ) {
    return await createClassProjectAction(user, classProject);
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async listClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {});
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
  async listApprovedClassProjectByCategory(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Arg('categoryId', () => String, { nullable: true }) categroyId: string,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: true,
      category: categroyId
    });
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(TeacherMiddleware)
  async listUnapprovedClassProjectByCategory(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Arg('categoryId', () => String, { nullable: true }) categroyId: string,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: false,
      category: categroyId
    });
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async listMyApprovedClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: true,
      user: user._id
    });
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async listMyUnapprovedClassProject(
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      isApproved: false,
      user: user._id
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
  async getClassProjectById(@Arg('classProjectId', () => String, { nullable: false }) id: string) {
    return await getClassProjectAction(id);
  }

  @Mutation(() => Boolean)
  async deleteClassProject(@Arg('classProjectId', () => String, { nullable: false }) id: string) {
    return await deleteClassProjectAction(id);
  }

  @Mutation(() => ClassProjectResponse)
  @UseMiddleware(StudentMiddleware)
  async updateClassProject(
    @Arg('classProject') classProject: UpdateClassProjectInput,
    @Ctx() { user }: any,
  ) {
    return await updateClassProjectAction(user, classProject);
  }

  @Mutation(() => ClassProjectResponse)
  @UseMiddleware(TeacherMiddleware)
  async updateClassProjectApproval(
    @Arg('classProjectId') id: string,
    @Arg('approval') approval: boolean,
  ) {
    return await updateClassProjectApprovalAction(id, approval);
  }

  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async searchApprovedClassProject(
    @Arg('title') title: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    return await listClassProjectAction(user, pager, {
      title: { $regex: title, $options: 'i' }, 
      isApproved: true,
    });
  }
  
  @Query(() => ListClassProjectResponse)
  @UseMiddleware(OptionalMiddleware)
  async searchClassProject(
    @Arg('title') title: string,
    @Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput,
    @Ctx() { user }: any,
  ) {
    const ClassProject = await listClassProjectAction(user, pager, { title: { $regex: title, $options: 'i' }, isApproved: true });
    return ClassProject;
  }
}
