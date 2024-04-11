import { PaginationInput } from '../../typeDefs';
import { ThesisLikeRepositoryImpl, ThesisRepositoryImpl } from '../../repositories';
import { ThesisLikeService, ThesisService } from '../../services';
import { ListThesisResponse, User } from '../../entities';

const listThesisAction = async (user: User, pager: PaginationInput, query: any): Promise<ListThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const thesisLikeService = new ThesisLikeService(new ThesisLikeRepositoryImpl());

  const theses = await thesisService.getThesis(pager, query);

  theses.thesis.forEach(async (thesis) => {
    thesis.liked = false;
  });
  if (user) {
    for (let i = 0; i < theses.thesis.length; i++) {
      theses.thesis[i].liked = await thesisLikeService.hasLiked(user._id.toString(), theses.thesis[i]._id.toString());
    }
  }

  return theses;
};

export default listThesisAction;
