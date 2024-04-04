import { ThesisCategoryService } from '../../../services';
import { ThesisCategoryRepositoryImpl } from '../../../repositories';
import { UpdateThesisCategoryInput, ThesisCategory } from '../../../entities';
import { Types } from 'mongoose';

const updateThesisCategoryAction = async (thesisCategoryInput: UpdateThesisCategoryInput) => {
  const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

  if (!thesisCategoryInput) {
    throw new Error('Input is required');
  }

  if (!thesisCategoryInput.name) {
    throw new Error('Name is required');
  }

  const category: ThesisCategory = {
    _id: new Types.ObjectId(thesisCategoryInput.id),
    name: thesisCategoryInput.name,
    description: thesisCategoryInput.description,
  };

  return await thesisCategoryService.updateThesisCategory(category);
};

export default updateThesisCategoryAction;
