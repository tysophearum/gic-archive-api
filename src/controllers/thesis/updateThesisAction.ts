import { UpdateThesisInput } from '../../entities/thesis/thesis';
import { Thesis, ThesisResponse, User } from '../../entities';
import { ThesisRepositoryImpl, UserRepositoryImpl } from '../../repositories';
import { ThesisService, UserService } from '../../services';
import validateUserId from '../../util/validateUserId';
import { FileUpload } from 'graphql-upload-minimal';
import saveFile from '../../util/saveFileUtil';
import validateThesisCategoryId from '../../util/validateThesisCategoryId';
import { Types } from 'mongoose';

const updateThesisAction = async (
  user: User,
  thesisInput: UpdateThesisInput,
): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { id, title, description, teacher, category, collaborators, repositoryLink, videoLink } = thesisInput;

  const valThesis = await thesisService.getThesisById(id);
  if (!valThesis) {
    throw new Error('Thesis not found');
  }

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
      const haveUser = await validateUserId(collaborator);
      if (!haveUser) {
        throw new Error('One or more of the collaborators is not found');
      }
    }),
  );
  
  // const thesisLink = ['await saveFile(file);'];

  // const image = 'await saveFile(imageInput);';

  const thesis: Thesis = {
    _id: new Types.ObjectId(id),
    title,
    description,
    files: valThesis.files,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    category,
    teacher,
    videoLink,
    image: valThesis.image,
  };
  return await thesisService.updateThesis(thesis);
};

export default updateThesisAction;
