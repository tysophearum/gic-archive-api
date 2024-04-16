import { ClassProject } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';

const deleteClassProjectAction = async (id: string): Promise<boolean> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  return await classProjectService.deleteClassProject(id);
};

export default deleteClassProjectAction;
