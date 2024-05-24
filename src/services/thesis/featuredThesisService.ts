import { FeaturedThesis, MinFeaturedThesis } from "../../entities";
import { FeaturedThesisRepository } from "../../repositories";

export class FeaturedThesisService {
  private featuredThesisRepository: FeaturedThesisRepository;

  constructor (featuredThesisRepository: FeaturedThesisRepository) {
    this.featuredThesisRepository = featuredThesisRepository;
  }

  async listFeaturedThesiss(query: any, sort?: any): Promise<MinFeaturedThesis[]> {
    return this.featuredThesisRepository.findFeaturedThesis(query, sort);
  }

  async addFeaturedThesis(featuredThesis: FeaturedThesis): Promise<MinFeaturedThesis> {
    return this.featuredThesisRepository.addFeaturedThesis(featuredThesis);
  }

  async removeFeaturedThesis(id: string): Promise<boolean> {
    return this.featuredThesisRepository.removeFeaturedThesis(id);
  }
}