import { UserRepositoryImpl } from '../../repositories/userRepository';
import { UserService } from '../../services/userService';
import { PaginationInput } from '../../typeDefs';
import { ListUsersResponse } from '../../entities/user';
import { getObjectSignedUrl } from '../../util/s3';

const listUsersAction = async (pager: PaginationInput, query: any): Promise<ListUsersResponse> => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const users = await userService.getUsers(pager, query);
  const promises = users.users.map(async (user, i) => {
    user.image = await getObjectSignedUrl(user.image);
  });
  
  // Wait for all promises to resolve
  await Promise.all(promises);

  return users;
};

export default listUsersAction;
