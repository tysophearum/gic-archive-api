import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectCategory } from '../../entities';

export interface ClassProjectCategoryRepository {
  createClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory>;
  findClassProjectCategory(query: any): Promise<ClassProjectCategory[]>;
  findClassProjectCategoryById(id: string): Promise<ClassProjectCategory>;
  updateClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory>;
  deleteClassProjectCategory(id: string): Promise<void>;
}

export class ClassProjectCategoryRepositoryImpl implements ClassProjectCategoryRepository {
  private classProjectCategoryModel = getModelForClass(ClassProjectCategory);

  async createClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.create(classProjectCategory);
  }

  async findClassProjectCategory(query: any): Promise<ClassProjectCategory[]> {
    return await this.classProjectCategoryModel.find(query);
  }

  async findClassProjectCategoryById(id: string): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.findById(id);
  }

  async updateClassProjectCategory(classProjectCategory: ClassProjectCategory): Promise<ClassProjectCategory> {
    return await this.classProjectCategoryModel.findByIdAndUpdate(classProjectCategory._id, classProjectCategory, {
      new: true,
    });
  }

  async deleteClassProjectCategory(id: string): Promise<void> {
    await this.classProjectCategoryModel.findByIdAndDelete(id).exec();
  }
}