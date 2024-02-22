import { Document } from "../entities";
import { DocumentRepository } from "../repositories";

export class DocumentService {
    private documentRepository: DocumentRepository

    constructor (documentRepository: DocumentRepository) {
        this.documentRepository = documentRepository;
    }

    async createDocument(document: Document) {
        return this.documentRepository.createDocument(document);
    }
}