import { CreateThesisInput } from "../../entities/thesis/thesis"
import { Thesis } from "../../entities"
import { ThesisRepositoryImpl } from "../../repositories"
import { ThesisService } from "../../services"
import validateUserId from "../../util/validateUserId"
import { FileUpload } from "graphql-upload-minimal"
import saveFile from "../../util/saveFileUtil"
import validateThesisCategoryId from "../../util/validateThesisCategoryId"

const createThesisAction = async (userId: string, thesisInput:CreateThesisInput, file: FileUpload): Promise<Thesis> => {
    const thesisRepository = new ThesisRepositoryImpl()
    const thesisService = new ThesisService(thesisRepository)

    const {title, description, repositoryLink, collaborators, category } = thesisInput;

    if(!title || !description || !repositoryLink || !userId || !category) {
        throw new Error("Invalid input")
    }

    const haveCategory = await validateThesisCategoryId(category)
    if (!haveCategory) {
        throw new Error("Category not found")
    }

    const haveUser = await validateUserId(userId)
    if (!haveUser) {
        throw new Error("User not found")
    }

    await Promise.all(collaborators.map(async (collaborator) => {
        const haveUser = await validateUserId(collaborator);
        if (!haveUser) {
            throw new Error("One or more of the collaborators is not found");
        }
    }));

    if (!file) {
        throw new Error("File is required")
    }
    const thesisLink = await saveFile(file)
    
    const thesis: Thesis = {
        title,
        description,
        thesisLink,
        repositoryLink,
        user: userId,
        collaborators,
        isApproved: false,
        likeAmount: 0,
        category
    }
    return await thesisService.createThesis(thesis);
}

export default createThesisAction;