import { getModelForClass } from '@typegoose/typegoose';
import { ThesisFeedback } from '../../entities';
import { PaginationInput } from '../../typeDefs';
import { ThesisFeedbackResponse } from '../../entities/thesis/thesisFeedback';

export interface ThesisFeedbackRepository {
  createThesisFeedback(thesisFeedback: ThesisFeedbackResponse): Promise<ThesisFeedbackResponse>;
  updateThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback>;
  deleteThesisFeedback(thesisFeedbackId: string): Promise<void>;
  findThesisFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ThesisFeedback[]>;
  countThesisFeedbacks(query: any): Promise<number>;
  getThesisFeedbackById(id: string): Promise<ThesisFeedback>;
}

export class ThesisFeedbackRepositoryImpl implements ThesisFeedbackRepository {
  private thesisFeedbackModel = getModelForClass(ThesisFeedback);

  async createThesisFeedback(thesisFeedback: ThesisFeedbackResponse): Promise<ThesisFeedbackResponse> {
    return (await this.thesisFeedbackModel.create(thesisFeedback)).populate('user');
  }

  async updateThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback> {
    return await this.thesisFeedbackModel
      .findByIdAndUpdate(thesisFeedback._id, thesisFeedback, { new: true })
      .populate('user');
  }

  async deleteThesisFeedback(thesisFeedbackId: string): Promise<void> {
    await this.thesisFeedbackModel.findByIdAndDelete(thesisFeedbackId);
  }

  async findThesisFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ThesisFeedback[]> {
    const skip = (page - 1) * limit;

    return await this.thesisFeedbackModel.find(query).populate('user').skip(skip).limit(limit).exec();
  }

  async countThesisFeedbacks(query: any): Promise<number> {
    return await this.thesisFeedbackModel.countDocuments(query).exec();
  }

  async getThesisFeedbackById(id: string): Promise<ThesisFeedback> {
    return await this.thesisFeedbackModel.findById(id);
  }
}
