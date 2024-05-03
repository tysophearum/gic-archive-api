import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectCategory } from '../../entities';

export interface ClassProjectCategoryRepository {
  createClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory>;
  findClassProjectCategory(query: any): Promise<ClassProjectCategory[]>;
  updateClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory>;
  deleteClassProjectCategory(id: string): Promise<void>;
  getClassProjectCategoryById(id: string): Promise<ClassProjectCategory>;
}

export class ClassProjectCategoryRepositoryImpl implements ClassProjectCategoryRepository {
  private classProjectCategoryModel = getModelForClass(ClassProjectCategory);

  async createClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.create(classProjectCategory);
  }

  async findClassProjectCategory(query: any): Promise<ClassProjectCategory[]> {
    return await this.classProjectCategoryModel.find(query).populate('teachers');
  }

  async updateClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.findByIdAndUpdate(classProjectCategory._id, classProjectCategory, { new: true });
  }

  async deleteClassProjectCategory(id: string): Promise<void> {
    await this.classProjectCategoryModel.findByIdAndDelete(id).exec();
  }

  async getClassProjectCategoryById(id: string): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.findById(id).populate('teachers');
  }
}
