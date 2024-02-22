import { getModelForClass } from "@typegoose/typegoose";
import { Document, User } from "../entities";
import { PaginationInput } from "../typeDefs";

export interface DocumentRepository {
  createDocument(document: Document): Promise<Document>;
  getAllDocuments(pager: PaginationInput): Promise<Document[]>;
  countDocuments(): Promise<number>;
}

export class DocumentRepositoryImpl implements DocumentRepository {
  private documentModel = getModelForClass(Document);
  private userModel = getModelForClass(User);

  async countDocuments(): Promise<number> {
    return await this.documentModel.countDocuments();
  }

  async createDocument(document: Document): Promise<Document> {
    return (
      await (await this.documentModel.create(document)).populate("user")
    ).populate("collaborators");
  }

  async getAllDocuments({ page, limit }: PaginationInput): Promise<Document[]> {
    const skip = (page - 1) * limit;
    
    return await this.documentModel
      .find()
      .populate("user")
      .populate("collaborators")
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
