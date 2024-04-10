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
  file: FileUpload,
  imageInput: FileUpload,
): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  const { id, title, description, teacher, thesisCategory, collaborators, repositoryLink, videoLink } = thesisInput;

  const valThesis = await thesisService.getThesisById(id);
  if (!valThesis) {
    throw new Error('Thesis not found');
  }

  if (!title || !description || !repositoryLink || !user || !thesisCategory) {
    throw new Error('Invalid input');
  }

  const haveCategory = await validateThesisCategoryId(thesisCategory);
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

  if (!file) {
    throw new Error('File is required');
  }
  const thesisLink = 'await saveFile(file);';

  const image = 'await saveFile(imageInput);';

  const thesis: Thesis = {
    _id: new Types.ObjectId(id),
    title,
    description,
    thesisLink,
    repositoryLink,
    user: user._id.toString(),
    collaborators,
    isApproved: false,
    likeAmount: 0,
    thesisCategory,
    teacher,
    videoLink,
    image,
  };
  return await thesisService.updateThesis(thesis);
};

export default updateThesisAction;
