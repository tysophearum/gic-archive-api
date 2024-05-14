import { UserService } from '../../services';
import { UserRepositoryImpl } from '../../repositories';
import { getObjectSignedUrl } from '../../util/s3';

const getUserByIdAction = async (userId: string) => {
  if (!userId) {
    throw new Error('User id is required');
  }

  if (typeof userId !== 'string') {
    throw new Error('User id must be a string');
  }

  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  let user = await userService.getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.image) {
    user.image = await getObjectSignedUrl(user.image)
  }


  return user;
};

export default getUserByIdAction;
