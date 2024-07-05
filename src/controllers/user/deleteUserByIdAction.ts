import { UserService } from '../../services';
import { UserRepositoryImpl } from '../../repositories';

const deleteUserByIdAction = async (userId: string) => {
  if (!userId) {
    throw new Error('User id is required');
  }

  if (typeof userId !== 'string') {
    throw new Error('User id must be a string');
  }

  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  let user = await userService.deleteUser(userId);

  return user;
};

export default deleteUserByIdAction;
