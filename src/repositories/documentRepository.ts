import { getModelForClass } from "@typegoose/typegoose";
import { Document } from "../entities";

export interface DocumentRepository {
    createDocument(document: Document): Promise<Document>;
}

export class DocumentRepositoryImpl implements DocumentRepository {
    private documentModel = getModelForClass(Document);

    async createDocument(document: Document): Promise<Document> {
        return await this.documentModel.create(document);
    }
}