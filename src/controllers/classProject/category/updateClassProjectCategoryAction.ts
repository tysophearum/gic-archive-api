import { ClassProjectCategoryService } from '../../../services';
import { ClassProjectCategoryRepositoryImpl } from '../../../repositories';
import { UpdateClassProjectCategoryInput, ClassProjectCategory } from '../../../entities';
import { Types } from 'mongoose';

const updateClassProjectCategoryAction = async (classProjectCategoryInput: UpdateClassProjectCategoryInput) => {
  const classProjectCategoryService = new ClassProjectCategoryService(new ClassProjectCategoryRepositoryImpl());

  if (!classProjectCategoryInput) {
    throw new Error('Input is required');
  }

  if (!classProjectCategoryInput.name) {
    throw new Error('Name is required');
  }

  const category: ClassProjectCategory = {
    _id: new Types.ObjectId(classProjectCategoryInput.id),
    name: classProjectCategoryInput.name,
    description: classProjectCategoryInput.description,
  };

  return await classProjectCategoryService.updateClassProjectCategory(category);
};

export default updateClassProjectCategoryAction;
