import { getModelForClass } from '@typegoose/typegoose';
import { ThesisCategory } from '../../entities';

export interface ThesisCategoryRepository {
  createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory>;
  findThesisCategory(query: any): Promise<ThesisCategory[]>;
  findThesisCategoryById(id: string): Promise<ThesisCategory>;
  updateThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory>;
  deleteThesisCategory(id: string): Promise<void>;
  getThesisCategoryById(id: string): Promise<ThesisCategory>;
}

export class ThesisCategoryRepositoryImpl implements ThesisCategoryRepository {
  private thesisCategoryModel = getModelForClass(ThesisCategory);

  async createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
    return await this.thesisCategoryModel.create(thesisCategory);
  }

  async findThesisCategory(query: any): Promise<ThesisCategory[]> {
    return await this.thesisCategoryModel.find(query);
  }

  async findThesisCategoryById(id: string): Promise<ThesisCategory> {
    return await this.thesisCategoryModel.findById(id);
  }

  async updateThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
    return await this.thesisCategoryModel.findByIdAndUpdate(thesisCategory._id, thesisCategory, { new: true });
  }

  async deleteThesisCategory(id: string): Promise<void> {
    await this.thesisCategoryModel.findByIdAndDelete(id).exec();
  }

  async getThesisCategoryById(id: string): Promise<ThesisCategory> {
    return await this.thesisCategoryModel.findById(id);
  }
}
