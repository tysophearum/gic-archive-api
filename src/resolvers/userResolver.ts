import { listUsersAction, registerUserAction, getUserByIdAction, getUserContribution, updateUserAction, deleteUserByIdAction } from '../controllers/user';
import { Contribution, ListUsersResponse, User, UserRegisterInput, UserResponse, UpdateUserInput } from '../entities/user';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { PaginationInput } from '../typeDefs';
import logInUserAction from '../controllers/user/logInUserActon';
import StudentMiddleware from '../middleware/StudentMiddleware';
import AdminMiddleware from '../middleware/AdminMiddleware';

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('user') user: UserRegisterInput,
  ): Promise<UserResponse> {
    return await registerUserAction({...user, role: 'student'});
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(AdminMiddleware)
  async registerTeacher(
    @Arg('user') user: UserRegisterInput,
  ): Promise<UserResponse> {
    return await registerUserAction({...user, role: 'teacher'});
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(AdminMiddleware)
  async registerAdmin(
    @Arg('user') user: UserRegisterInput,
  ): Promise<UserResponse> {
    return await registerUserAction({...user, role: 'admin'});
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

  @Mutation(() => Boolean)
  async deleteUserById(@Arg('userId') id: string) {
    return await deleteUserByIdAction(id);
  }

  @Query(() => User)
  @UseMiddleware(StudentMiddleware)
  async getMe(@Ctx() { user }: any,) {
    return await getUserByIdAction(user.id);
  }

  @Query(() => ListUsersResponse)
  async listStudents(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listUsersAction(pager, {role: 'student'});
  }

  @Query(() => ListUsersResponse)
  async listTeachers(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listUsersAction(pager, {role: 'teacher'});
  }

  @Query(() => ListUsersResponse)
  async listAdmins(@Arg('pager', () => PaginationInput, { nullable: true }) pager: PaginationInput) {
    return await listUsersAction(pager, {role: 'admin'});
  }

  @Query(() => [User])
  async searchStudents(@Arg('name') name: string) {
    const users = await listUsersAction({page: 1, limit: 8}, { name: { $regex: name, $options: 'i' }, role: 'student' });
    return users.users;
  }

  @Query(() => [User])
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
