import { getModelForClass } from '@typegoose/typegoose';
import { FeaturedClassProject, ClassProject, MinFeaturedClassProject } from '../../entities';

export interface FeaturedClassProjectRepository {
  findFeaturedClassProject(query: any): Promise<FeaturedClassProject[]>;
  addFeaturedClassProject(featuredClassProject: FeaturedClassProject): Promise<MinFeaturedClassProject>;
  removeFeaturedClassProject(id: string): Promise<boolean>;
}

export class FeaturedClassProjectRepositoryImpl implements FeaturedClassProjectRepository {
  private featuredClassProjectModel = getModelForClass(FeaturedClassProject);
  private classProjectModel = getModelForClass(ClassProject);

  async findFeaturedClassProject(query: any): Promise<MinFeaturedClassProject[]> {
    return this.featuredClassProjectModel.find(query);
  }

  async addFeaturedClassProject(featuredClassProject: FeaturedClassProject): Promise<MinFeaturedClassProject> {
    return this.featuredClassProjectModel.create(featuredClassProject);
  }

  async removeFeaturedClassProject(id: string): Promise<boolean> {
    try {
      await this.featuredClassProjectModel.findByIdAndDelete(id).exec();
      return true;
    } catch (error) {
      return false;
    }
  }
}
