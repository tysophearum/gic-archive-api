import calculatePaginationResponse from '../../util/calculatePaginationResponse';
import { Thesis, ThesisResponse } from '../../entities';
import { ThesisRepository } from '../../repositories';
import { PaginationInput } from '../../typeDefs';
import { ListThesisResponse } from '../../entities/thesis/thesis';

export class ThesisService {
  private thesisRepository: ThesisRepository;

  constructor(thesisRepository: ThesisRepository) {
    this.thesisRepository = thesisRepository;
  }

  async createThesis(thesis: Thesis): Promise<ThesisResponse> {
    return await this.thesisRepository.createThesis(thesis);
  }

  async getThesis(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListThesisResponse> {
    const thesis = await this.thesisRepository.findThesis(pager, query);
    const totalThesis = await this.thesisRepository.countThesis(query);
    const pagination = calculatePaginationResponse(pager, totalThesis);

    return {
      data: thesis,
      pagination,
    };
  }

  async getThesisById(id: string): Promise<ThesisResponse> {
    return await this.thesisRepository.findThesisById(id);
  }

  async updateThesis(thesis: Thesis): Promise<ThesisResponse> {
    return await this.thesisRepository.updateThesis(thesis);
  }

  async deleteThesis(id: string): Promise<boolean> {
    return await this.thesisRepository.deleteThesis(id);
  }

  async incrementThesisLike(id: string): Promise<boolean> {
    return await this.thesisRepository.incrementThesisLike(id);
  }
  async decrementThesisLike(id: string): Promise<boolean> {
    return await this.thesisRepository.decrementThesisLike(id);
  }
}
