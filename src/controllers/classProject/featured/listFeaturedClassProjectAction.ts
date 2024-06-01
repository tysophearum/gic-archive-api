import { ClassProjectLikeService, ClassProjectService, FeaturedClassProjectService } from "../../../services";
import { ClassProjectLikeRepositoryImpl, ClassProjectRepositoryImpl, FeaturedClassProjectRepositoryImpl } from "../../../repositories";
import { User } from "../../../entities";
import { getObjectSignedUrl } from "../../../util/s3";

const listFeaturedClassProjectAction = async (user: User, query: any, sort?: any) => {
  const featuredClassProjectRepository = new FeaturedClassProjectRepositoryImpl();
  const featuredClassProjectService = new FeaturedClassProjectService(featuredClassProjectRepository);
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const classProjectLikeService = new ClassProjectLikeService(new ClassProjectLikeRepositoryImpl());

  const featuredClassProjects = await featuredClassProjectService.listFeaturedClassProjects(query, sort);

  const classProjectIds = featuredClassProjects.map(featuredClassProject => featuredClassProject.classProject);
  
  const classProjects = await classProjectService.getClassProject({limit: 8, page: 1}, { _id: { $in: classProjectIds } });

  const promises = classProjects.data.map(async (classProject) => {
    classProject.liked = false;
    classProject.image = await getObjectSignedUrl(classProject.image);
  });
  
  // Wait for all promises to resolve
  await Promise.all(promises);
  
  if (user) {
    for (let i = 0; i < classProjects.data.length; i++) {
      classProjects.data[i].liked = await classProjectLikeService.hasLiked(user._id.toString(), classProjects.data[i]._id.toString());
    }
  }

  return classProjects.data;
}

export default listFeaturedClassProjectAction;