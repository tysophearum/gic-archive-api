import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectFeedback, ClassProjectFeedbackResponse } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ClassProjectFeedbackRepository {
  createClassProjectFeedback(classProjectFeedback: ClassProjectFeedbackResponse): Promise<ClassProjectFeedbackResponse>;
  updateClassProjectFeedback(classProjectFeedback: ClassProjectFeedback): Promise<ClassProjectFeedback>;
  deleteClassProjectFeedback(classProjectFeedbackId: string): Promise<void>;
  findClassProjectFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ClassProjectFeedback[]>;
  countClassProjectFeedbacks(query: any): Promise<number>;
  getClassProjectFeedbackById(id: string): Promise<ClassProjectFeedback>;
}

export class ClassProjectFeedbackRepositoryImpl implements ClassProjectFeedbackRepository {
  private classProjectFeedbackModel = getModelForClass(ClassProjectFeedback);

  async createClassProjectFeedback(classProjectFeedback: ClassProjectFeedbackResponse): Promise<ClassProjectFeedbackResponse> {
    return (await this.classProjectFeedbackModel.create(classProjectFeedback)).populate('user');
  }

  async updateClassProjectFeedback(classProjectFeedback: ClassProjectFeedback): Promise<ClassProjectFeedback> {
    return await this.classProjectFeedbackModel
      .findByIdAndUpdate(classProjectFeedback._id, classProjectFeedback, { new: true })
      .populate('user');
  }

  async deleteClassProjectFeedback(classProjectFeedbackId: string): Promise<void> {
    await this.classProjectFeedbackModel.findByIdAndDelete(classProjectFeedbackId);
  }

  async findClassProjectFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ClassProjectFeedback[]> {
    const skip = (page - 1) * limit;

    return await this.classProjectFeedbackModel.find(query).populate('user').skip(skip).limit(limit).exec();
  }

  async countClassProjectFeedbacks(query: any): Promise<number> {
    return await this.classProjectFeedbackModel.countDocuments(query).exec();
  }

  async getClassProjectFeedbackById(id: string): Promise<ClassProjectFeedback> {
    return await this.classProjectFeedbackModel.findById(id);
  }
}
