import { FeaturedThesisService } from "../../../services";
import { FeaturedThesisRepositoryImpl } from "../../../repositories";
import { FeaturedThesis } from "../../../entities";

const addFeaturedThesisAction = async (thesisId: string) => {
  const featuredThesisRepository = new FeaturedThesisRepositoryImpl();
  const featuredThesisService = new FeaturedThesisService(featuredThesisRepository);

  if (!thesisId) {
    throw new Error("Thesis id is required");
  }

  const featuredThesis: FeaturedThesis = {
    thesis: thesisId,
  };

  return await featuredThesisService.addFeaturedThesis(featuredThesis);
}

export default addFeaturedThesisAction;