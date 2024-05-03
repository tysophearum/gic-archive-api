import { listUsersAction, registerUserAction, getUserByIdAction, getUserContribution, updateUserAction } from '../controllers/user';
import { Contribution, ListUsersResponse, MinUser, User, UserRegisterInput, UserResponse, UpdateUserInput } from '../entities/user';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { PaginationInput } from '../typeDefs';
import logInUserAction from '../controllers/user/logInUserActon';
import StudentMiddleware from '../middleware/StudentMiddleware';
import AdminMiddleware from '../middleware/AdminMiddleware';

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('user') user: UserRegisterInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload | null,
  ): Promise<UserResponse> {
    return await registerUserAction(user, file);
  }

  @Mutation(() => UserResponse)
  async logIn(@Arg('email') email: string, @Arg('password') password: string): Promise<UserResponse> {
    return await logInUserAction(email, password);
  }

  @Query(() => ListUsersResponse)
  async listUser(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listUsersAction(pager, {});
  }

  @Query(() => User)
  async getUserById(@Arg('userId') id: string) {
    return await getUserByIdAction(id);
  }

  @Query(() => User)
  @UseMiddleware(StudentMiddleware)
  async getMe(@Ctx() { user }: any,) {
    return await getUserByIdAction(user.id);
  }

  @Query(() => [MinUser])
  async searchStudents(@Arg('name') name: string) {
    const users = await listUsersAction({page: 1, limit: 8}, { name: { $regex: name, $options: 'i' }, role: 'student' });
    return users.users;
  }

  @Query(() => [MinUser])
  async searchTeachers(@Arg('name') name: string) {
    const users = await listUsersAction({page: 1, limit: 8}, { name: { $regex: name, $options: 'i' }, role: 'teacher' });
    return users.users;
  }

  @Query(() => Contribution)
  @UseMiddleware(StudentMiddleware)
  async getMyContribution(@Ctx() { user }: any) {
    return await getUserContribution({
      user: user.id,
      isApproved: true
    });
  }

  @Query(() => Contribution)
  async getUserContribution(@Arg('userId') id: string) {
    return await getUserContribution({
      user: id,
      isApproved: true
    });
  }

  @Mutation(() => User)
  @UseMiddleware(StudentMiddleware)
  async updateMyProfile(
    @Ctx() { user }: any,
    @Arg('user') updateUserInput: UpdateUserInput
  ) {
    return await updateUserAction(user.id, updateUserInput);
  }
}
