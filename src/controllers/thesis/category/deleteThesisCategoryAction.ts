import { ThesisCategoryService } from '../../../services';
import { ThesisCategoryRepositoryImpl } from '../../../repositories';

const deleteThesisCategoryAction = async (id: string) => {
  const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

  if (!id) {
    throw new Error('Id is required');
  }

  return thesisCategoryService.deleteThesisCategory(id);
};

export default deleteThesisCategoryAction;
