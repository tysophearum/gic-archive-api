import { UserRepositoryImpl } from '../../repositories/userRepository';
import { UserService } from '../../services/userService';
import { PaginationInput } from '../../typeDefs';
import { ListUsersResponse } from '../../entities/user';

const listUsersAction = async (pager: PaginationInput, query: any): Promise<ListUsersResponse> => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  return await userService.getUsers(pager, query);
};

export default listUsersAction;
