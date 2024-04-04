import { getModelForClass } from '@typegoose/typegoose';
import { FeaturedClassProject, ClassProject } from '../../entities';

export interface FeaturedClassProjectRepository {
  findFeaturedClassProject(): Promise<FeaturedClassProject[]>;
}

export class FeaturedClassProjectRepositoryImpl implements FeaturedClassProjectRepository {
  private featuredClassProjectModel = getModelForClass(FeaturedClassProject);
  private classProjectModel = getModelForClass(ClassProject);

  async findFeaturedClassProject(): Promise<FeaturedClassProject[]> {
    return this.featuredClassProjectModel.find().populate('classProject');
  }
}
