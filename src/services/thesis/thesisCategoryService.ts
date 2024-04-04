import { ThesisCategory } from '../../entities';
import { ThesisCategoryRepository } from '../../repositories';

export class ThesisCategoryService {
  private thesisCategoryRepository: ThesisCategoryRepository;

  constructor(thesisCategoryRepository: ThesisCategoryRepository) {
    this.thesisCategoryRepository = thesisCategoryRepository;
  }

  async createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
    return await this.thesisCategoryRepository.createThesisCategory(thesisCategory);
  }

  async updateThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
    return await this.thesisCategoryRepository.updateThesisCategory(thesisCategory);
  }

  async deleteThesisCategory(id: string): Promise<boolean> {
    try {
      await this.thesisCategoryRepository.deleteThesisCategory(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getThesisCategory(query: any = null): Promise<ThesisCategory[]> {
    return await this.thesisCategoryRepository.findThesisCategory(query);
  }

  async getThesisCategoryById(id: string): Promise<ThesisCategory> {
    return await this.thesisCategoryRepository.getThesisCategoryById(id);
  }
}
