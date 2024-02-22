import { CreateDocumentInput } from "../../entities/document"
import { Document } from "../../entities"
import { DocumentRepositoryImpl } from "../../repositories"
import { DocumentService } from "../../services"
import validateUserId from "../../util/validateUserId"
import { FileUpload } from "graphql-upload-minimal"
import saveFile from "../../util/saveFileUtil"

const createDocumentAction =async (documentInput:CreateDocumentInput, file: FileUpload): Promise<Document> => {
    const documentRepository = new DocumentRepositoryImpl()
    const documentService = new DocumentService(documentRepository)

    const {title, description, repositoryLink, userId, collaborators, } = documentInput;

    if(!title || !description || !repositoryLink || !userId) {
        throw new Error("Invalid input")
    }

    const haveUser = await validateUserId(userId)
    if (!haveUser) {
        throw new Error("User not found")
    }

    collaborators.forEach(async (collaborator) => {
        const haveUser = await validateUserId(collaborator)
        if (!haveUser) {
            throw new Error("One or more of the collaborators is not found")
        } 
        return haveUser; 
    })

    if (!file) {
        throw new Error("File is required")
    }
    const documentLink = await saveFile(file)
    
    const document: Document = {
        title,
        description,
        documentLink,
        repositoryLink,
        userId,
        collaborators,
        isApproved: false,
    }
    return await documentService.createDocument(document);
}

export default createDocumentAction;