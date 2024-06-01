import { ClassProject, ClassProjectResponse } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';
import { getObjectSignedUrl } from '../../util/s3';

const getClassProjectAction = async (id: string): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  let classProject = await classProjectService.getClassProjectById(id);

  classProject.image = await getObjectSignedUrl(classProject.image);
  classProject.user.image = await getObjectSignedUrl(classProject.user.image);
  
  const promises = classProject.collaborators.map(async (collaborator, i) => {
    collaborator.image = await getObjectSignedUrl(collaborator.image);
  });
  
  await Promise.all(promises);

  return classProject;
};

export default getClassProjectAction;
