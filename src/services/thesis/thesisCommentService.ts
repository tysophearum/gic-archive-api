import { ThesisCommentRepository } from '../../repositories';
import { ListThesisCommentResponse, ThesisComment, ThesisCommentResponse } from '../../entities';
import { PaginationInput } from 'typeDefs';
import calculatePaginationResponse from '../../util/calculatePaginationResponse';

export class ThesisCommentService {
  private thesisCommentRepository: ThesisCommentRepository;

  constructor(thesisCommentRepository: ThesisCommentRepository) {
    this.thesisCommentRepository = thesisCommentRepository;
  }

  async createThesisComment(thesisComment: ThesisComment): Promise<ThesisCommentResponse> {
    return this.thesisCommentRepository.createThesisComment(thesisComment);
  }

  async deleteThesisComment(id: string): Promise<boolean> {
    try {
      await this.thesisCommentRepository.deleteThesisComment(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getThesisCommentById(id: string): Promise<ThesisComment> {
    return this.thesisCommentRepository.getThesisCommentById(id);
  }

  async updateThesisComment(thesisComment: ThesisComment): Promise<ThesisCommentResponse> {
    return this.thesisCommentRepository.updateThesisComment(thesisComment);
  }

  async getThesisComment(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListThesisCommentResponse> {
    const comment = await this.thesisCommentRepository.findThesisComments(pager, query);
    const totalThesisComment = await this.thesisCommentRepository.countThesisComments(query);
    const pagination = calculatePaginationResponse(pager, totalThesisComment);

    return {
      comment,
      pagination,
    };
  }
}
