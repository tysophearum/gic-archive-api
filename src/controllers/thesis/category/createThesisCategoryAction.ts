import { ThesisCategoryService } from "../../../services";
import { ThesisCategoryRepositoryImpl } from "../../../repositories";
import { CreateThesisCategoryInput, ThesisCategory } from "../../../entities";

const createThesisCategoryAction = async (thesisCategoryInput: CreateThesisCategoryInput) => {
    const thesisCategoryService = new ThesisCategoryService(new ThesisCategoryRepositoryImpl());

    if (!thesisCategoryInput) {
        throw new Error("Input is required");
    }

    if (!thesisCategoryInput.name) {
        throw new Error("Name is required");
    }

    const category: ThesisCategory = {
        name: thesisCategoryInput.name,
        description: thesisCategoryInput.description,
    }

    return await thesisCategoryService.createThesisCategory(category)
}

export default createThesisCategoryAction;