import { ClassProjectResponse } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';
import { getObjectSignedUrl } from '../../util/s3';

const getClassProjectAction = async (id: string): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  let classProject = await classProjectService.getClassProjectById(id);

  classProject.image = await getObjectSignedUrl(classProject.image);
  classProject.user.image = await getObjectSignedUrl(classProject.user.image);
  
  const collaboratorsPromises = classProject.collaborators.map(async (collaborator) => {
    collaborator.image = await getObjectSignedUrl(collaborator.image);
  });

  let fileLinks: string[] = [];
  const fileLinksPromises = classProject.files.map(async (file) => {
    const link = await getObjectSignedUrl(file);
    fileLinks.push(link);
  });
  
  // Wait for all promises to resolve
  await Promise.all(collaboratorsPromises);
  await Promise.all(fileLinksPromises);

  classProject.fileLinks = fileLinks;

  return classProject;
};

export default getClassProjectAction;
