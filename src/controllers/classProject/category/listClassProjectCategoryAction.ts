import { ClassProjectCategoryService } from '../../../services';
import { ClassProjectCategoryRepositoryImpl } from '../../../repositories';

const listClassProjectCategoryAction = async (query?: any) => {
  const classProjectCategoryService = new ClassProjectCategoryService(new ClassProjectCategoryRepositoryImpl());

  return await classProjectCategoryService.getClassProjectCategory(query);
};

export default listClassProjectCategoryAction;
