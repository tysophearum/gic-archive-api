import { ClassProjectCategoryService } from '../../../services';
import { ClassProjectCategoryRepositoryImpl } from '../../../repositories';

const deleteClassProjectCategoryAction = async (id: string) => {
  const classProjectCategoryService = new ClassProjectCategoryService(new ClassProjectCategoryRepositoryImpl());

  if (!id) {
    throw new Error('Id is required');
  }

  return classProjectCategoryService.deleteClassProjectCategory(id);
};

export default deleteClassProjectCategoryAction;
