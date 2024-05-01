import { PaginationInput } from '../../typeDefs';
import { ClassProjectLikeRepositoryImpl, ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectLikeService, ClassProjectService } from '../../services';
import { ListClassProjectResponse, User } from '../../entities';

const listClassProjectAction = async (user: User, pager: PaginationInput, query: any): Promise<ListClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const classProjectLikeService = new ClassProjectLikeService(new ClassProjectLikeRepositoryImpl());

  const classProjects = await classProjectService.getClassProject(pager, query);

  classProjects.data.forEach(async (classProject) => {
    classProject.liked = false;
  });
  if (user) {
    for (let i = 0; i < classProjects.data.length; i++) {
      classProjects.data[i].liked = await classProjectLikeService.hasLiked(user._id.toString(), classProjects.data[i]._id.toString());
    }
  }

  return classProjects;
};

export default listClassProjectAction;
