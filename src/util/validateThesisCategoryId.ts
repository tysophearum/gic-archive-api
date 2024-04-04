import { ThesisCategoryService } from '../services';
import { ThesisCategoryRepositoryImpl } from '../repositories';

const thesisCategoryRepository = new ThesisCategoryRepositoryImpl();
const thesisCategoryService = new ThesisCategoryService(thesisCategoryRepository);

export default async function validateThesisCategoryId(thesisCategoryId: string) {
  const thesisCategory = await thesisCategoryService.getThesisCategoryById(thesisCategoryId);

  if (!thesisCategory) {
    return false;
  }

  return true;
}
