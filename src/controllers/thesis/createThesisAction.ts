import { CreateThesisInput } from '../../entities/thesis/thesis';
import { Thesis, ThesisResponse, User } from '../../entities';
import { ThesisRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ThesisService, UserService } from '../../services';
import { FileUpload } from 'graphql-upload-minimal';
import saveFile from '../../util/saveFileUtil';
import validateThesisCategoryId from '../../util/validateThesisCategoryId';

const createThesisAction = async (
  user: User,
  thesisInput: CreateThesisInput,
): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { title, description, teacher, category, collaborators, repositoryLink, videoLink } = thesisInput;

  if (!title) {
    throw new Error('Title is required');
  }
  
  if (!description) {
    throw new Error('Description is required');
  }
  
  if (!repositoryLink) {
    throw new Error('Repository link is required');
  }
  
  if (!user) {
    throw new Error('User is required');
  }
  
  if (!category) {
    throw new Error('Category is required');
  }

  if (!teacher) {
    throw new Error('Teacher is required');
  } 

  const haveCategory = await validateThesisCategoryId(category);
  if (!haveCategory) {
    throw new Error('Category not found');
  }

  if (!teacher) {
    throw new Error('Teacher is required');
  }
  const haveTeacher = await userService.getUserById(teacher);
  if (!haveTeacher || haveTeacher.role != 'teacher') {
    throw new Error('Teacher is not found');
  }

  await Promise.all(
    collaborators.map(async (collaborator) => {
      const haveUser = await userService.getUserById(collaborator);
      if (!haveUser) {
        throw new Error('One or more of the collaborators is not found');
      }
    }),
  );

  const files = [''];

  const thesis: Thesis = {
    title,
    description,
    files,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    category,
    teacher,
    videoLink,
  };
  return await thesisService.createThesis(thesis);
};

export default createThesisAction;
