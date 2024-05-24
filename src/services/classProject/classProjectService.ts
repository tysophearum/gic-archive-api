import calculatePaginationResponse from '../../util/calculatePaginationResponse';
import { ClassProject, ClassProjectResponse } from '../../entities';
import { ClassProjectRepository } from '../../repositories';
import { PaginationInput } from '../../typeDefs';
import { ListClassProjectResponse } from '../../entities/classProject/classProject';

export class ClassProjectService {
  private classProjectRepository: ClassProjectRepository;

  constructor(classProjectRepository: ClassProjectRepository) {
    this.classProjectRepository = classProjectRepository;
  }

  async createClassProject(classProject: ClassProject): Promise<ClassProjectResponse> {
    return await this.classProjectRepository.createClassProject(classProject);
  }

  async getClassProject(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
    sort?: any
  ): Promise<ListClassProjectResponse> {
    const classProject = await this.classProjectRepository.findClassProject(pager, query, sort);
    const totalClassProject = await this.classProjectRepository.countClassProject(query);
    const pagination = calculatePaginationResponse(pager, totalClassProject);

    return {
      data: classProject,
      pagination,
    };
  }

  async getClassProjectById(id: string): Promise<ClassProjectResponse> {
    return await this.classProjectRepository.findClassProjectById(id);
  }

  async updateClassProject(classProject: ClassProject): Promise<ClassProjectResponse> {
    return await this.classProjectRepository.updateClassProject(classProject);
  }

  async deleteClassProject(id: string): Promise<boolean> {
    return await this.classProjectRepository.deleteClassProject(id);
  }

  async incrementClassProjectLike(id: string): Promise<boolean> {
    return await this.classProjectRepository.incrementClassProjectLike(id);
  }
  async decrementClassProjectLike(id: string): Promise<boolean> {
    return await this.classProjectRepository.decrementClassProjectLike(id);
  }

  async countClassProject(query: any): Promise<number> {
    return await this.classProjectRepository.countClassProject(query);
  }
}
