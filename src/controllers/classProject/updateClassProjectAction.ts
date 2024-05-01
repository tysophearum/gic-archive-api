import { UpdateClassProjectInput } from '../../entities/classProject/classProject';
import { ClassProject, ClassProjectResponse, User } from '../../entities';
import { ClassProjectRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ClassProjectService, UserService } from '../../services';
import validateUserId from '../../util/validateUserId';
import { FileUpload } from 'graphql-upload-minimal';
import saveFile from '../../util/saveFileUtil';
import validateClassProjectCategoryId from '../../util/validateClassProjectCategoryId';
import { Types } from 'mongoose';

const updateClassProjectAction = async (
  user: User,
  classProjectInput: UpdateClassProjectInput,
  imageInput: FileUpload,
): Promise<ClassProjectResponse> => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { id, title, description, classProjectCategory, collaborators, repositoryLink, videoLink } = classProjectInput;

  const valClassProject = await classProjectService.getClassProjectById(id);
  if (!valClassProject) {
    throw new Error('ClassProject not found');
  }

  if (!title || !description || !repositoryLink || !user || !classProjectCategory) {
    throw new Error('Invalid input');
  }

  const haveCategory = await validateClassProjectCategoryId(classProjectCategory);
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

  const classProjectLink = 'await saveFile(file);';

  const image = 'await saveFile(imageInput);';

  const classProject: ClassProject = {
    _id: new Types.ObjectId(id),
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
  return await classProjectService.updateClassProject(classProject);
};

export default updateClassProjectAction;
