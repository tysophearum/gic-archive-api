import { UpdateClassProjectInput } from '../../entities/classProject/classProject';
import { ClassProject, ClassProjectResponse, User } from '../../entities';
import { ClassProjectRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ClassProjectService, UserService } from '../../services';
import validateUserId from '../../util/validateUserId';
import validateClassProjectCategoryId from '../../util/validateClassProjectCategoryId';
import { Types } from 'mongoose';

const updateClassProjectAction = async (
  user: User,
  classProjectInput: UpdateClassProjectInput,
): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  const { id, title, description, category, collaborators, repositoryLink, videoLink } = classProjectInput;

  const valClassProject = await classProjectService.getClassProjectById(id);
  if (!valClassProject) {
    throw new Error('ClassProject not found');
  }

  if (!title || !description || !repositoryLink || !user || !category) {
    throw new Error('Invalid input');
  }

  const haveCategory = await validateClassProjectCategoryId(category);
  if (!haveCategory) {
    throw new Error('Category not found');
  }

  await Promise.all(
    collaborators.map(async (collaborator) => {
      const haveUser = await validateUserId(collaborator);
      if (!haveUser) {
        throw new Error('One or more of the collaborators is not found');
      }
    }),
  );

  const classProject: ClassProject = {
    _id: new Types.ObjectId(id),
    title,
    description,
    files: valClassProject.files,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    category,
    videoLink,
    image: valClassProject.image,
  };
  return await classProjectService.updateClassProject(classProject);
};

export default updateClassProjectAction;
