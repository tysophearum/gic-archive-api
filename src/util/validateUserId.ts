import { UserService } from '../services/userService';
import { UserRepositoryImpl } from '../repositories/userRepository';

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

export default async function validateUserId(userIds: string) {
  const user = await userService.getUserById(userIds);

  if (!user) {
    return false;
  }

  return user;
}
