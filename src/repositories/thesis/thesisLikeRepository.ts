import { getModelForClass } from '@typegoose/typegoose';
import { ThesisLike } from '../../entities';

export interface ThesisLikeRepository {
  countThesisLike(query: any): Promise<number>;
}

export class ThesisLikeRepositoryImpl implements ThesisLikeRepository {
  private thesisLikeModel = getModelForClass(ThesisLike);

  countThesisLike(query: any): Promise<number> {
    return this.thesisLikeModel.countDocuments(query);
  }
}
