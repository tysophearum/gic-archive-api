import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectComment, ClassProjectCommentResponse } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ClassProjectCommentRepository {
  createClassProjectComment(classProjectComment: ClassProjectCommentResponse): Promise<ClassProjectCommentResponse>;
  updateClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment>;
  deleteClassProjectComment(classProjectCommentId: string): Promise<void>;
  findClassProjectComments({ page, limit }: PaginationInput, query: any): Promise<ClassProjectComment[]>;
  countClassProjectComments(query: any): Promise<number>;
  getClassProjectCommentById(id: string): Promise<ClassProjectComment>;
}

export class ClassProjectCommentRepositoryImpl implements ClassProjectCommentRepository {
  private classProjectCommentModel = getModelForClass(ClassProjectComment);

  async createClassProjectComment(classProjectComment: ClassProjectCommentResponse): Promise<ClassProjectCommentResponse> {
    return (await this.classProjectCommentModel.create(classProjectComment)).populate('user');
  }

  async updateClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment> {
    return await this.classProjectCommentModel
      .findByIdAndUpdate(classProjectComment._id, classProjectComment, { new: true })
      .populate('user');
  }

  async deleteClassProjectComment(classProjectCommentId: string): Promise<void> {
    await this.classProjectCommentModel.findByIdAndDelete(classProjectCommentId).exec();
  }

  async findClassProjectComments({ page, limit }: PaginationInput, query: any): Promise<ClassProjectComment[]> {
    const skip = (page - 1) * limit;

    return await this.classProjectCommentModel.find(query).populate('user').skip(skip).limit(limit).exec();
  }

  async countClassProjectComments(query: any): Promise<number> {
    return await this.classProjectCommentModel.countDocuments(query).exec();
  }

  async getClassProjectCommentById(id: string): Promise<ClassProjectComment> {
    return await this.classProjectCommentModel.findById(id);
  }
}
