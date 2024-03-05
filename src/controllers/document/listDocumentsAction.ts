import { PaginationInput } from "../../typeDefs"
import { Document } from "../../entities"
import { DocumentRepositoryImpl } from "../../repositories"
import { DocumentService } from "../../services"
import { ListDocumentResponse } from "../../entities/document"

const listDocumentsAction =async (pager: PaginationInput): Promise<ListDocumentResponse> => {
    const documentRepository = new DocumentRepositoryImpl()
    const documentService = new DocumentService(documentRepository)

    return await documentService.getDocuments(pager)
}

export default listDocumentsAction;