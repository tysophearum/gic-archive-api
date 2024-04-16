import { ClassProjectCategoryService } from '../services';
import { ClassProjectCategoryRepositoryImpl } from '../repositories';

const classProjectCategoryRepository = new ClassProjectCategoryRepositoryImpl();
const classProjectCategoryService = new ClassProjectCategoryService(classProjectCategoryRepository);

export default async function validateClassProjectCategoryId(classProjectCategoryId: string) {
  const classProjectCategory = await classProjectCategoryService.getClassProjectCategoryById(classProjectCategoryId);

  if (!classProjectCategory) {
    return false;
  }

  return true;
}
