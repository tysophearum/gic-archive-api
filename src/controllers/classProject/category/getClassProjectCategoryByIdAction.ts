import { ClassProjectCategoryService } from '../../../services';
import { ClassProjectCategoryRepositoryImpl } from '../../../repositories';

const getClassProjectCategoryByIdAction = async (categoryId: string) => {
  const classProjectCategoryService = new ClassProjectCategoryService(new ClassProjectCategoryRepositoryImpl());

  return await classProjectCategoryService.getClassProjectCategoryById(categoryId);
};

export default getClassProjectCategoryByIdAction;
