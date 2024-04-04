import { getModelForClass } from '@typegoose/typegoose';
import { ThesisFeedback } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ThesisFeedbackRepository {
  createThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback>;
  updateThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback>;
  deleteThesisFeedback(thesisFeedback: ThesisFeedback): Promise<void>;
  findThesisFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ThesisFeedback[]>;
}

export class ThesisFeedbackRepositoryImpl implements ThesisFeedbackRepository {
  private thesisFeedbackModel = getModelForClass(ThesisFeedback);

  async createThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback> {
    return await this.thesisFeedbackModel.create(thesisFeedback);
  }

  async updateThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedback> {
    return await this.thesisFeedbackModel.findByIdAndUpdate(thesisFeedback._id, thesisFeedback, { new: true });
  }

  async deleteThesisFeedback(thesisFeedback: ThesisFeedback): Promise<void> {
    await this.thesisFeedbackModel.findByIdAndDelete(thesisFeedback._id);
  }

  async findThesisFeedbacks({ page, limit }: PaginationInput, query: any): Promise<ThesisFeedback[]> {
    const skip = (page - 1) * limit;

    return await this.thesisFeedbackModel.find(query).skip(skip).limit(limit).exec();
  }
}
