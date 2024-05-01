import { ClassProjectResponse } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';

const updateClassProjectApprovalAction = async (
  id: string,
  approval: boolean
): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  
  const classProject = await classProjectService.getClassProjectById(id);
  if (!classProject) {
    throw new Error('ClassProject not found');
  }
  classProject.isApproved = approval;

  return await classProjectService.updateClassProject(classProject);
};

export default updateClassProjectApprovalAction;
