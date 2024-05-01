import { FeaturedThesisRepositoryImpl } from "../../../repositories";
import { FeaturedThesisService } from "../../../services";

const removeFeaturedThesisAction = async (thesisId: string) => {
  const featuredThesisRepository = new FeaturedThesisRepositoryImpl();
  const featuredThesisService = new FeaturedThesisService(featuredThesisRepository);

  const featuredThesis = await featuredThesisService.listFeaturedThesiss({
    thesis: thesisId
  })

  if (!featuredThesis.length) {
    throw new Error('Featured Thesis not found');
  }

  return await featuredThesisService.removeFeaturedThesis(featuredThesis[0]._id.toString());
}

export default removeFeaturedThesisAction;