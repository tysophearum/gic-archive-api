import { getModelForClass } from '@typegoose/typegoose';
import { ClassProject, ClassProjectCategory, User } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ClassProjectRepository {
  createClassProject(classProject: ClassProject): Promise<ClassProject>;
  findClassProject(pager: PaginationInput, query: any): Promise<ClassProject[]>;
  countClassProject(query: any): Promise<number>;
  findClassProjectById(id: string): Promise<ClassProject>;
  updateClassProject(classProject: ClassProject): Promise<ClassProject>;
  deleteClassProject(id: string): Promise<void>;
}

export class ClassProjectRepositoryImpl implements ClassProjectRepository {
  private classProjectModel = getModelForClass(ClassProject);
  private userModel = getModelForClass(User);
  private classProjectCategoryModel = getModelForClass(ClassProjectCategory);

  async createClassProject(classProject: ClassProject): Promise<ClassProject> {
    return (await (await this.classProjectModel.create(classProject)).populate('user')).populate('collaborators');
  }

  async findClassProject({ page, limit }: PaginationInput, query: any = null): Promise<ClassProject[]> {
    const skip = (page - 1) * limit;

    return await this.classProjectModel.find(query).populate('user').lean().skip(skip).limit(limit).exec();
  }

  async countClassProject(query: any): Promise<number> {
    return await this.classProjectModel.countDocuments(query);
  }

  async findClassProjectById(id: string): Promise<ClassProject> {
    return await this.classProjectModel
      .findById(id)
      .populate('user')
      .populate('collaborators')
      .populate('classProjectCategory')
      .exec();
  }

  async updateClassProject(classProject: ClassProject): Promise<ClassProject> {
    return await this.classProjectModel.findByIdAndUpdate(classProject._id, classProject, { new: true }).exec();
  }

  async deleteClassProject(id: string): Promise<void> {
    await this.classProjectModel.findByIdAndDelete(id).exec();
  }
}
