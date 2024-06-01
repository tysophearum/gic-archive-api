import { ThesisLikeService, ThesisService, FeaturedThesisService } from "../../../services";
import { ThesisLikeRepositoryImpl, ThesisRepositoryImpl, FeaturedThesisRepositoryImpl } from "../../../repositories";
import { User } from "../../../entities";
import { getObjectSignedUrl } from "../../../util/s3";

const listFeaturedThesisAction = async (user: User, query: any, sort?: any) => {
  const featuredThesisRepository = new FeaturedThesisRepositoryImpl();
  const featuredThesisService = new FeaturedThesisService(featuredThesisRepository);
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const thesisLikeService = new ThesisLikeService(new ThesisLikeRepositoryImpl());

  const featuredThesiss = await featuredThesisService.listFeaturedThesiss(query, sort);

  const thesisIds = featuredThesiss.map(featuredThesis => featuredThesis.thesis);
  
  const theses = await thesisService.getThesis({limit: 8, page: 1}, { _id: { $in: thesisIds } });

  const promises = theses.data.map(async (thesis) => {
    thesis.liked = false;
    thesis.image = await getObjectSignedUrl(thesis.image);
  });
  
  // Wait for all promises to resolve
  await Promise.all(promises);
  if (user) {
    for (let i = 0; i < theses.data.length; i++) {
      theses.data[i].liked = await thesisLikeService.hasLiked(user._id.toString(), theses.data[i]._id.toString());
    }
  }

  return theses.data;
}

export default listFeaturedThesisAction;