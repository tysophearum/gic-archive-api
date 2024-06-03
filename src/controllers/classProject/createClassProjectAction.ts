import { CreateClassProjectInput } from '../../entities/classProject/classProject';
import { ClassProject, ClassProjectResponse, User } from '../../entities';
import { ClassProjectRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ClassProjectService, UserService } from '../../services';
import validateClassProjectCategoryId from '../../util/validateClassProjectCategoryId';

const createClassProjectAction = async (
  user: User,
  classProjectInput: CreateClassProjectInput,
): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { title, description, category, collaborators, repositoryLink, videoLink } = classProjectInput;

  if (!title || !description || !repositoryLink || !user || !category) {
    throw new Error('Invalid input');
  }

  const haveCategory = await validateClassProjectCategoryId(category);
  if (!haveCategory) {
    throw new Error('Category not found');
  }

  await Promise.all(
    collaborators.map(async (collaborator) => {
      const haveUser = await userService.getUserById(collaborator);
      if (!haveUser) {
        throw new Error('One or more of the collaborators is not found');
      }
    }),
  );
  // await saveFile(imageInput);
  // if (!file) {
  //   throw new Error('File is required');
  // }
  
  const files = [''];

  const classProject: ClassProject = {
    title,
    description,
    files,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    category,
    videoLink,
  };
  return await classProjectService.createClassProject(classProject);
};

export default createClassProjectAction;
