import { CreateClassProjectInput } from '../../entities/classProject/classProject';
import { ClassProject, ClassProjectResponse, User } from '../../entities';
import { ClassProjectRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ClassProjectService, UserService } from '../../services';
import { FileUpload } from 'graphql-upload-minimal';
import saveFile from '../../util/saveFileUtil';
import validateClassProjectCategoryId from '../../util/validateClassProjectCategoryId';

const createClassProjectAction = async (
  user: User,
  classProjectInput: CreateClassProjectInput,
): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { title, description, classProjectCategory, collaborators, repositoryLink, videoLink } = classProjectInput;

  if (!title || !description || !repositoryLink || !user || !classProjectCategory) {
    throw new Error('Invalid input');
  }

  const haveCategory = await validateClassProjectCategoryId(classProjectCategory);
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
  
  const classProjectLink = 'await saveFile(file);';

  const image = 'await saveFile(imageInput);';

  const classProject: ClassProject = {
    title,
    description,
    classProjectLink,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    classProjectCategory,
    videoLink,
    image,
  };
  return await classProjectService.createClassProject(classProject);
};

export default createClassProjectAction;
