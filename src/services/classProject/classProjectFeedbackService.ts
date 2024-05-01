import { ClassProjectFeedbackRepository } from '../../repositories';
import { ListClassProjectFeedbackResponse, ClassProjectFeedback, ClassProjectFeedbackResponse } from '../../entities';
import { PaginationInput } from 'typeDefs';
import calculatePaginationResponse from '../../util/calculatePaginationResponse';

export class ClassProjectFeedbackService {
  private classProjectFeedbackRepository: ClassProjectFeedbackRepository;

  constructor(classProjectFeedbackRepository: ClassProjectFeedbackRepository) {
    this.classProjectFeedbackRepository = classProjectFeedbackRepository;
  }

  async createClassProjectFeedback(classProjectFeedback: ClassProjectFeedback): Promise<ClassProjectFeedbackResponse> {
    return this.classProjectFeedbackRepository.createClassProjectFeedback(classProjectFeedback);
  }

  async deleteClassProjectFeedback(id: string): Promise<boolean> {
    try {
      await this.classProjectFeedbackRepository.deleteClassProjectFeedback(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getClassProjectFeedbackById(id: string): Promise<ClassProjectFeedback> {
    return this.classProjectFeedbackRepository.getClassProjectFeedbackById(id);
  }

  async updateClassProjectFeedback(classProjectFeedback: ClassProjectFeedback): Promise<ClassProjectFeedbackResponse> {
    return this.classProjectFeedbackRepository.updateClassProjectFeedback(classProjectFeedback);
  }

  async getClassProjectFeedback(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListClassProjectFeedbackResponse> {
    const feedbacks = await this.classProjectFeedbackRepository.findClassProjectFeedbacks(pager, query);
    const totalClassProjectFeedback = await this.classProjectFeedbackRepository.countClassProjectFeedbacks(query);
    const pagination = calculatePaginationResponse(pager, totalClassProjectFeedback);

    return {
      feedbacks,
      pagination,
    };
  }
}
