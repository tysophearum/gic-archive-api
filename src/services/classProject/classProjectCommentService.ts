import { ClassProjectCommentRepository } from '../../repositories';
import { ListClassProjectCommentResponse, ClassProjectComment, ClassProjectCommentResponse } from '../../entities';
import { PaginationInput } from 'typeDefs';
import calculatePaginationResponse from '../../util/calculatePaginationResponse';

export class ClassProjectCommentService {
  private classProjectCommentRepository: ClassProjectCommentRepository;

  constructor(classProjectCommentRepository: ClassProjectCommentRepository) {
    this.classProjectCommentRepository = classProjectCommentRepository;
  }

  async createClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectCommentResponse> {
    return this.classProjectCommentRepository.createClassProjectComment(classProjectComment);
  }

  async deleteClassProjectComment(id: string): Promise<boolean> {
    try {
      await this.classProjectCommentRepository.deleteClassProjectComment(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getClassProjectCommentById(id: string): Promise<ClassProjectComment> {
    return this.classProjectCommentRepository.getClassProjectCommentById(id);
  }

  async updateClassProjectComment(classProjectComment: ClassProjectComment): Promise<ClassProjectCommentResponse> {
    return this.classProjectCommentRepository.updateClassProjectComment(classProjectComment);
  }

  async getClassProjectComment(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListClassProjectCommentResponse> {
    const comment = await this.classProjectCommentRepository.findClassProjectComments(pager, query);
    const totalClassProjectComment = await this.classProjectCommentRepository.countClassProjectComments(query);
    const pagination = calculatePaginationResponse(pager, totalClassProjectComment);

    return {
      comment,
      pagination,
    };
  }
}
