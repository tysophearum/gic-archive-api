import { getModelForClass } from '@typegoose/typegoose';
import { Thesis, ThesisResponse } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ThesisRepository {
  createThesis(thesis: Thesis): Promise<ThesisResponse>;
  findThesis(pager: PaginationInput, query: any, sort?: any): Promise<Thesis[]>;
  countThesis(query: any): Promise<number>;
  findThesisById(id: string): Promise<ThesisResponse>;
  updateThesis(thesis: Thesis): Promise<ThesisResponse>;
  deleteThesis(id: string): Promise<boolean>;
  incrementThesisLike(id: string): Promise<boolean>;
  decrementThesisLike(id: string): Promise<boolean>;
}

export class ThesisRepositoryImpl implements ThesisRepository {
  private thesisModel = getModelForClass(Thesis);
  private async populateFields(model: any, fields: string[]): Promise<any> {
    for (const field of fields) {
      model = await model.populate(field);
    }
    return model;
  }

  async countThesis(query: any): Promise<number> {
    return await this.thesisModel.countDocuments(query);
  }

  async createThesis(thesis: Thesis): Promise<ThesisResponse> {
    let createdThesis = await this.thesisModel.create(thesis);
    createdThesis = await this.populateFields(createdThesis, ['user', 'collaborators', 'teacher', 'category']);
    return createdThesis;
  }

  async findThesis({ page, limit }: PaginationInput, query: any = null, sort: any = { created_at: -1 }): Promise<Thesis[]> {
    const skip = (page - 1) * limit;

    return await this.thesisModel
      .find(query)
      .populate('user')
      .populate('category')
      .lean()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async findThesisById(id: string): Promise<ThesisResponse> {
    const thesis = await this.thesisModel
      .findById(id)
      .populate('user')
      .populate('collaborators')
      .populate('category')
      .populate('teacher')
      .exec();

    return thesis;
  }

  async updateThesis(thesis: Thesis): Promise<ThesisResponse> {
    let updatedThesis = await this.thesisModel.findByIdAndUpdate(thesis._id, thesis, { new: true });
    updatedThesis = await this.populateFields(updatedThesis, ['user', 'collaborators', 'teacher', 'category']);
    return updatedThesis;
  }

  async deleteThesis(id: string): Promise<boolean> {
    try {
      await this.thesisModel.findByIdAndDelete(id).exec();
      return true;
    } catch (error) {
      return false;
    }
  }
  async incrementThesisLike(id: string): Promise<boolean> {
    try {
      await this.thesisModel.findByIdAndUpdate(id, { $inc: { likeAmount: 1 } });
      return true;
    } catch (error) {
      console.log('Unable to like post ', id);
    }
  }
  async decrementThesisLike(id: string): Promise<boolean> {
    try {
      await this.thesisModel.findByIdAndUpdate(id, { $inc: { likeAmount: -1 } });
      return false;
    } catch (error) {
      console.log('Unable to dislike post ', id);
    }
  }
}
