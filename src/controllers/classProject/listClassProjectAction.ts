import { PaginationInput } from '../../typeDefs';
import { ClassProjectLikeRepositoryImpl, ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectLikeService, ClassProjectService } from '../../services';
import { ListClassProjectResponse, User } from '../../entities';

const listClassProjectAction = async (user: User, pager: PaginationInput, query: any): Promise<ListClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const classProjectLikeService = new ClassProjectLikeService(new ClassProjectLikeRepositoryImpl());

  const theses = await classProjectService.getClassProject(pager, query);

  theses.classProject.forEach(async (classProject) => {
    classProject.liked = false;
  });
  if (user) {
    for (let i = 0; i < theses.classProject.length; i++) {
      theses.classProject[i].liked = await classProjectLikeService.hasLiked(user._id.toString(), theses.classProject[i]._id.toString());
    }
  }

  return theses;
};

export default listClassProjectAction;
