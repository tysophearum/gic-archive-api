import { ClassProject, ClassProjectResponse } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';

const getClassProjectAction = async (id: string): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  return await classProjectService.getClassProjectById(id);
};

export default getClassProjectAction;
