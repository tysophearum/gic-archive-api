import { FeaturedClassProjectRepositoryImpl } from "../../../repositories";
import { FeaturedClassProjectService } from "../../../services";

const removeFeaturedClassProjectAction = async (classProjectId: string) => {
  const featuredClassProjectRepository = new FeaturedClassProjectRepositoryImpl();
  const featuredClassProjectService = new FeaturedClassProjectService(featuredClassProjectRepository);

  const featuredClassProject = await featuredClassProjectService.listFeaturedClassProjects({
    classProject: classProjectId
  })

  if (!featuredClassProject.length) {
    throw new Error('Featured ClassProject not found');
  }

  return await featuredClassProjectService.removeFeaturedClassProject(featuredClassProject[0]._id.toString());
}

export default removeFeaturedClassProjectAction;