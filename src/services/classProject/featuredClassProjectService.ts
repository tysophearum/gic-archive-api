import { FeaturedClassProject, MinFeaturedClassProject } from "../../entities";
import { FeaturedClassProjectRepository } from "../../repositories";

export class FeaturedClassProjectService {
  private featuredClassProjectRepository: FeaturedClassProjectRepository;

  constructor (featuredClassProjectRepository: FeaturedClassProjectRepository) {
    this.featuredClassProjectRepository = featuredClassProjectRepository;
  }

  async listFeaturedClassProjects(query: any): Promise<MinFeaturedClassProject[]> {
    return this.featuredClassProjectRepository.findFeaturedClassProject(query);
  }

  async addFeaturedClassProject(featuredClassProject: FeaturedClassProject): Promise<MinFeaturedClassProject> {
    return this.featuredClassProjectRepository.addFeaturedClassProject(featuredClassProject);
  }

  async removeFeaturedClassProject(id: string): Promise<boolean> {
    return this.featuredClassProjectRepository.removeFeaturedClassProject(id);
  }
}