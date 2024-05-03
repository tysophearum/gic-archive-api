import { ClassProjectCategoryService } from '../../../services';
import { ClassProjectCategoryRepositoryImpl } from '../../../repositories';
import { CreateClassProjectCategoryInput, ClassProjectCategory } from '../../../entities';

const createClassProjectCategoryAction = async (classProjectCategoryInput: CreateClassProjectCategoryInput) => {
  const classProjectCategoryService = new ClassProjectCategoryService(new ClassProjectCategoryRepositoryImpl());

  if (!classProjectCategoryInput) {
    throw new Error('Input is required');
  }

  if (!classProjectCategoryInput.name) {
    throw new Error('Name is required');
  }

  const category: ClassProjectCategory = {
    name: classProjectCategoryInput.name,
    description: classProjectCategoryInput.description,
    teachers: classProjectCategoryInput.teachers,
  };

  return await classProjectCategoryService.createClassProjectCategory(category);
};

export default createClassProjectCategoryAction;
