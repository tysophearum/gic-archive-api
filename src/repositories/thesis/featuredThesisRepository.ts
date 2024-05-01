import { getModelForClass } from '@typegoose/typegoose';
import { FeaturedThesis, Thesis, MinFeaturedThesis } from '../../entities';

export interface FeaturedThesisRepository {
  findFeaturedThesis(query: any): Promise<FeaturedThesis[]>;
  addFeaturedThesis(featuredThesis: FeaturedThesis): Promise<MinFeaturedThesis>;
  removeFeaturedThesis(id: string): Promise<boolean>;
}

export class FeaturedThesisRepositoryImpl implements FeaturedThesisRepository {
  private featuredThesisModel = getModelForClass(FeaturedThesis);
  private thesisModel = getModelForClass(Thesis);

  async findFeaturedThesis(query: any): Promise<MinFeaturedThesis[]> {
    return this.featuredThesisModel.find(query);
  }

  async addFeaturedThesis(featuredThesis: FeaturedThesis): Promise<MinFeaturedThesis> {
    return this.featuredThesisModel.create(featuredThesis);
  }

  async removeFeaturedThesis(id: string): Promise<boolean> {
    try {
      await this.featuredThesisModel.findByIdAndDelete(id).exec();
      return true;
    } catch (error) {
      return false;
    }
  }
}
