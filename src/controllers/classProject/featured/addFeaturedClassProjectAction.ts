import { FeaturedClassProjectService } from "../../../services";
import { FeaturedClassProjectRepositoryImpl } from "../../../repositories";
import { FeaturedClassProject } from "../../../entities";

const addFeaturedClassProjectAction = async (classProjectId: string) => {
  const featuredClassProjectRepository = new FeaturedClassProjectRepositoryImpl();
  const featuredClassProjectService = new FeaturedClassProjectService(featuredClassProjectRepository);

  if (!classProjectId) {
    throw new Error("Class project id is required");
  }

  const featuredClassProject: FeaturedClassProject = {
    classProject: classProjectId,
  };

  return await featuredClassProjectService.addFeaturedClassProject(featuredClassProject);
}

export default addFeaturedClassProjectAction;