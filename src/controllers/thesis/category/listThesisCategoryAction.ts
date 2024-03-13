import { ThesisCategoryService } from "../../../services";
import { ThesisCategoryRepositoryImpl } from "../../../repositories";

const listThesisCategoryAction = async () => {
    const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

    return await thesisCategoryService.getThesisCategory();
}

export default listThesisCategoryAction;