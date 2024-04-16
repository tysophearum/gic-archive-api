import { ClassProjectCategory } from '../../entities';
import { ClassProjectCategoryRepository } from '../../repositories';

export class ClassProjectCategoryService {
  private classProjectCategoryRepository: ClassProjectCategoryRepository;

  constructor(classProjectCategoryRepository: ClassProjectCategoryRepository) {
    this.classProjectCategoryRepository = classProjectCategoryRepository;
  }

  async createClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryRepository.createClassProjectCategory(classProjectCategory);
  }

  async updateClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryRepository.updateClassProjectCategory(classProjectCategory);
  }

  async deleteClassProjectCategory(id: string): Promise<boolean> {
    try {
      await this.classProjectCategoryRepository.deleteClassProjectCategory(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getClassProjectCategory(query: any = null): Promise<ClassProjectCategory[]> {
    return await this.classProjectCategoryRepository.findClassProjectCategory(query);
  }

  async getClassProjectCategoryById(id: string): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryRepository.getClassProjectCategoryById(id);
  }
}
