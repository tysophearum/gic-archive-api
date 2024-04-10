import { ThesisLike, User } from '../../../entities';
import { ThesisLikeRepositoryImpl } from '../../../repositories';
import { ThesisLikeService } from '../../../services';

const createThesisLikeAction = async (user: User, thesisId: string) => {
  const thesisLikeService = new ThesisLikeService(new ThesisLikeRepositoryImpl());

  if (!thesisId) {
    throw new Error('ThesisId is required');
  }

  const thesisLike: ThesisLike = {
    user: user._id.toString(),
    thesis: thesisId,
  };

  return thesisLikeService.like(thesisLike);
};

export default createThesisLikeAction;
