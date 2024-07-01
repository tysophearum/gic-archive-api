import { deleteFile } from '../../util/s3';
import { ClassProject } from '../../entities';
import { ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from '../../services';

const deleteClassProjectAction = async (id: string): Promise<boolean> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  const classProject = await classProjectService.getClassProjectById(id);
  if (!classProject) {
    throw new Error('Document not found');
  }

  try {
    await deleteFile(classProject.image);
    await Promise.all(
      classProject.files.map(async (document) => {
        await deleteFile(document);
      })
    );
  } catch (error) {
    throw new Error(error);
  }

  return await classProjectService.deleteClassProject(id);
};

export default deleteClassProjectAction;
