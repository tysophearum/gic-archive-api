import { ThesisCategoryService } from '../../../services';
import { ThesisCategoryRepositoryImpl } from '../../../repositories';

const listThesisCategoryAction = async (query?: any) => {
  const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

  return await thesisCategoryService.getThesisCategory(query);
};

export default listThesisCategoryAction;
