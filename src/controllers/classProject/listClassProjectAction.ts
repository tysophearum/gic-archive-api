import { PaginationInput } from '../../typeDefs';
import { ClassProjectLikeRepositoryImpl, ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectLikeService, ClassProjectService } from '../../services';
import { ListClassProjectResponse, User } from '../../entities';
import { getObjectSignedUrl } from '../../util/s3';

const listClassProjectAction = async (user: User, pager: PaginationInput, query: any, sort?: any): Promise<ListClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const classProjectLikeService = new ClassProjectLikeService(new ClassProjectLikeRepositoryImpl());

  const classProjects = await classProjectService.getClassProject(pager, query, sort);

  for (let i = 0; i < classProjects.data.length; i++) {
    let classProject = classProjects.data[i];
    classProject.liked = false;
    classProject.image = await getObjectSignedUrl(classProject.image);
    classProject.user.image = await getObjectSignedUrl(classProject.user.image);
  }
  if (user) {
    for (let i = 0; i < classProjects.data.length; i++) {
      classProjects.data[i].liked = await classProjectLikeService.hasLiked(user._id.toString(), classProjects.data[i]._id.toString());
    }
  }

  return classProjects;
};

export default listClassProjectAction;
