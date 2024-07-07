import { UserService } from '../../services';
import { UserRepositoryImpl } from '../../repositories';
import { deleteFile } from '../../util/s3';

const deleteUserByIdAction = async (userId: string) => {
  if (!userId) {
    throw new Error('User id is required');
  }

  if (typeof userId !== 'string') {
    throw new Error('User id must be a string');
  }

  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const user = await userService.getUserById(userId);

  if (user.image) {
    await deleteFile(user.image);
  }

  if (user.coverImage) {
    await deleteFile(user.coverImage);
  }

  const deletedUser = await userService.deleteUser(userId);

  return deletedUser;
};

export default deleteUserByIdAction;
