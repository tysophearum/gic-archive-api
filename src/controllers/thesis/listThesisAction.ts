import { PaginationInput } from '../../typeDefs';
import { ThesisLikeRepositoryImpl, ThesisRepositoryImpl } from '../../repositories';
import { ThesisLikeService, ThesisService } from '../../services';
import { ListThesisResponse, User } from '../../entities';
import { getObjectSignedUrl } from '../../util/s3';

const listThesisAction = async (user: User, pager: PaginationInput, query: any): Promise<ListThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const thesisLikeService = new ThesisLikeService(new ThesisLikeRepositoryImpl());

  const theses = await thesisService.getThesis(pager, query);

  for (let i = 0; i < theses.data.length; i++) {
    let thesis = theses.data[i];
    thesis.liked = false;
    thesis.image = await getObjectSignedUrl(thesis.image);
  }
  if (user) {
    for (let i = 0; i < theses.data.length; i++) {
      theses.data[i].liked = await thesisLikeService.hasLiked(user._id.toString(), theses.data[i]._id.toString());
    }
  }

  return theses;
};

export default listThesisAction;
