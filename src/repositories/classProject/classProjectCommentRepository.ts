import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectComment } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ClassProjectCommentRepository {
  createClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment>;
  updateClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment>;
  deleteClassProjectComment(classProjectCommentId: string): Promise<void>;
  findClassProjectComments({ page, limit }: PaginationInput, query: any): Promise<ClassProjectComment[]>;
  countClassProjectComments(query: any): Promise<number>;
}

export class ClassProjectCommentRepositoryImpl implements ClassProjectCommentRepository {
  private classProjectCommentModel = getModelForClass(ClassProjectComment);

  async createClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment> {
    return await this.classProjectCommentModel.create(classProjectComment);
  }

  async updateClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectComment> {
    return await this.classProjectCommentModel.findByIdAndUpdate(classProjectComment._id, classProjectComment, {
      new: true,
    });
  }

  async deleteClassProjectComment(classProjectCommentId: string): Promise<void> {
    await this.classProjectCommentModel.findByIdAndDelete(classProjectCommentId).exec();
  }

  async findClassProjectComments({ page, limit }: PaginationInput, query: any): Promise<ClassProjectComment[]> {
    const skip = (page - 1) * limit;

    return await this.classProjectCommentModel.find(query).skip(skip).limit(limit).exec();
  }

  async countClassProjectComments(query: any): Promise<number> {
    return await this.classProjectCommentModel.countDocuments(query).exec();
  }
}
