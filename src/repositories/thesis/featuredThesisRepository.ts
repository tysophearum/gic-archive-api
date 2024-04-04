import { getModelForClass } from '@typegoose/typegoose';
import { FeaturedThesis, Thesis } from '../../entities';

export interface FeaturedThesisRepository {
  findFeaturedThesis(): Promise<FeaturedThesis[]>;
}

export class FeaturedThesisRepositoryImpl implements FeaturedThesisRepository {
  private featuredThesisModel = getModelForClass(FeaturedThesis);
  private thesisModel = getModelForClass(Thesis);

  async findFeaturedThesis(): Promise<FeaturedThesis[]> {
    return this.featuredThesisModel.find().populate('thesis');
  }
}
