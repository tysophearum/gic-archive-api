import { ThesisCategoryService } from '../../../services';
import { ThesisCategoryRepositoryImpl } from '../../../repositories';

const getThesisCategoryByIdAction = async (categoryId: string) => {
  const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

  return await thesisCategoryService.getThesisCategoryById(categoryId);
};

export default getThesisCategoryByIdAction;
