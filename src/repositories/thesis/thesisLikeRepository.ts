import { getModelForClass } from '@typegoose/typegoose';
import { ThesisLike } from '../../entities';

export interface ThesisLikeRepository {
  countThesisLike(query: any): Promise<number>;
  createThesisLike(thesisLike: ThesisLike): Promise<ThesisLike>;
  deleteThesisLike(user: string, thesis: string): Promise<void>;
}

export class ThesisLikeRepositoryImpl implements ThesisLikeRepository {
  private thesisLikeModel = getModelForClass(ThesisLike);

  async countThesisLike(query: any): Promise<number> {
    return await this.thesisLikeModel.countDocuments(query);
  }
  async createThesisLike(thesisLike: ThesisLike): Promise<ThesisLike> {
    return await this.thesisLikeModel.create(thesisLike);
  }
  async deleteThesisLike(user: string, thesis: string): Promise<void> {
    await this.thesisLikeModel.deleteOne({ user, thesis });
  }
}
