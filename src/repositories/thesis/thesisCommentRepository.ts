import { getModelForClass } from '@typegoose/typegoose';
import { ThesisComment, ThesisCommentResponse } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ThesisCommentRepository {
  createThesisComment(thesisComment: ThesisCommentResponse): Promise<ThesisCommentResponse>;
  updateThesisComment(thesisComment: ThesisComment): Promise<ThesisComment>;
  deleteThesisComment(thesisCommentId: string): Promise<void>;
  findThesisComments({ page, limit }: PaginationInput, query: any): Promise<ThesisComment[]>;
  countThesisComments(query: any): Promise<number>;
  getThesisCommentById(id: string): Promise<ThesisComment>;
}

export class ThesisCommentRepositoryImpl implements ThesisCommentRepository {
  private thesisCommentModel = getModelForClass(ThesisComment);

  async createThesisComment(thesisComment: ThesisCommentResponse): Promise<ThesisCommentResponse> {
    return (await this.thesisCommentModel.create(thesisComment)).populate('user');
  }

  async updateThesisComment(thesisComment: ThesisComment): Promise<ThesisComment> {
    return await this.thesisCommentModel
      .findByIdAndUpdate(thesisComment._id, thesisComment, { new: true })
      .populate('user');
  }

  async deleteThesisComment(thesisCommentId: string): Promise<void> {
    await this.thesisCommentModel.findByIdAndDelete(thesisCommentId).exec();
  }

  async findThesisComments({ page, limit }: PaginationInput, query: any): Promise<ThesisComment[]> {
    const skip = (page - 1) * limit;

    return await this.thesisCommentModel.find(query).populate('user').skip(skip).limit(limit).exec();
  }

  async countThesisComments(query: any): Promise<number> {
    return await this.thesisCommentModel.countDocuments(query).exec();
  }

  async getThesisCommentById(id: string): Promise<ThesisComment> {
    return await this.thesisCommentModel.findById(id);
  }
}
