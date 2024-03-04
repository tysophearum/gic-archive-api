import calculatePaginationResponse from "../util/calculatePaginationResponse";
import { Document } from "../entities";
import { DocumentRepository } from "../repositories";
import { PaginationInput } from "../typeDefs";

export class DocumentService {
    private documentRepository: DocumentRepository

    constructor (documentRepository: DocumentRepository) {
        this.documentRepository = documentRepository;
    }

    async createDocument(document: Document): Promise<Document> {
        return await this.documentRepository.createDocument(document);
    }

    async getDocuments(pager: PaginationInput={page: 1, limit: Number(process.env.MAX_LIMIT)}, query: any=null) {
        const documents = await this.documentRepository.findDocuments(pager, query);
        const totalDocuments = await this.documentRepository.countDocuments();
        const pagination = calculatePaginationResponse(pager, totalDocuments);

        return {
            documents,
            pagination
        }
    }
}