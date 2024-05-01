import { ThesisLikeService, ThesisService, FeaturedThesisService } from "../../../services";
import { ThesisLikeRepositoryImpl, ThesisRepositoryImpl, FeaturedThesisRepositoryImpl } from "../../../repositories";
import { User } from "../../../entities";

const listFeaturedThesisAction = async (user: User, query: any) => {
  const featuredThesisRepository = new FeaturedThesisRepositoryImpl();
  const featuredThesisService = new FeaturedThesisService(featuredThesisRepository);
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const thesisLikeService = new ThesisLikeService(new ThesisLikeRepositoryImpl());

  const featuredThesiss = await featuredThesisService.listFeaturedThesiss(query);

  const thesisIds = featuredThesiss.map(featuredThesis => featuredThesis.thesis);
  
  const theses = await thesisService.getThesis({limit: 8, page: 1}, { _id: { $in: thesisIds } });

  theses.data.forEach(async (thesis) => {
    thesis.liked = false;
  });
  if (user) {
    for (let i = 0; i < theses.data.length; i++) {
      theses.data[i].liked = await thesisLikeService.hasLiked(user._id.toString(), theses.data[i]._id.toString());
    }
  }

  return theses.data;
}

export default listFeaturedThesisAction;