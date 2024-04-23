import { ThesisFeedbackRepository } from '../../repositories';
import { ListThesisFeedbackResponse, ThesisFeedback, ThesisFeedbackResponse } from '../../entities';
import { PaginationInput } from 'typeDefs';
import calculatePaginationResponse from '../../util/calculatePaginationResponse';

export class ThesisFeedbackService {
  private thesisFeedbackRepository: ThesisFeedbackRepository;

  constructor(thesisFeedbackRepository: ThesisFeedbackRepository) {
    this.thesisFeedbackRepository = thesisFeedbackRepository;
  }

  async createThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedbackResponse> {
    return this.thesisFeedbackRepository.createThesisFeedback(thesisFeedback);
  }

  async deleteThesisFeedback(id: string): Promise<boolean> {
    try {
      await this.thesisFeedbackRepository.deleteThesisFeedback(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getThesisFeedbackById(id: string): Promise<ThesisFeedback> {
    return this.thesisFeedbackRepository.getThesisFeedbackById(id);
  }

  async updateThesisFeedback(thesisFeedback: ThesisFeedback): Promise<ThesisFeedbackResponse> {
    return this.thesisFeedbackRepository.updateThesisFeedback(thesisFeedback);
  }

  async getThesisFeedback(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListThesisFeedbackResponse> {
    const thesisFeedbacks = await this.thesisFeedbackRepository.findThesisFeedbacks(pager, query);
    const totalThesisFeedback = await this.thesisFeedbackRepository.countThesisFeedbacks(query);
    const pagination = calculatePaginationResponse(pager, totalThesisFeedback);

    return {
      thesisFeedbacks,
      pagination,
    };
  }
}
