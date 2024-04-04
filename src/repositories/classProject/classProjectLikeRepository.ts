import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectLike } from '../../entities';

export interface ClassProjectLikeRepository {
  countClassProjectLike(query: any): Promise<number>;
}

export class ClassProjectLikeRepositoryImpl implements ClassProjectLikeRepository {
  private classProjectLikeModel = getModelForClass(ClassProjectLike);

  countClassProjectLike(query: any): Promise<number> {
    return this.classProjectLikeModel.countDocuments(query);
  }
}
