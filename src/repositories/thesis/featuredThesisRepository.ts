import { getModelForClass } from '@typegoose/typegoose';
import { FeaturedThesis, Thesis, MinFeaturedThesis } from '../../entities';

export interface FeaturedThesisRepository {
  findFeaturedThesis(query: any, sort?: any): Promise<FeaturedThesis[]>;
  addFeaturedThesis(featuredThesis: FeaturedThesis): Promise<MinFeaturedThesis>;
  removeFeaturedThesis(id: string): Promise<boolean>;
}

export class FeaturedThesisRepositoryImpl implements FeaturedThesisRepository {
  private featuredThesisModel = getModelForClass(FeaturedThesis);
  private thesisModel = getModelForClass(Thesis);

  async findFeaturedThesis(query: any, sort: any = { created_at: -1 }): Promise<MinFeaturedThesis[]> {
    return this.featuredThesisModel.find(query).sort(sort).exec();
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
