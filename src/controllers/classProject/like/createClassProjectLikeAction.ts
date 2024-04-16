import { ClassProjectLike, User } from '../../../entities';
import { ClassProjectLikeRepositoryImpl } from '../../../repositories';
import { ClassProjectLikeService } from '../../../services';

const createClassProjectLikeAction = async (user: User, classProjectId: string) => {
  const classProjectLikeService = new ClassProjectLikeService(new ClassProjectLikeRepositoryImpl());

  if (!classProjectId) {
    throw new Error('ClassProjectId is required');
  }

  const classProjectLike: ClassProjectLike = {
    user: user._id.toString(),
    classProject: classProjectId,
  };

  return classProjectLikeService.like(classProjectLike);
};

export default createClassProjectLikeAction;
