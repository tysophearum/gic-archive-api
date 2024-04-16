import { getModelForClass } from '@typegoose/typegoose';
import { ClassProjectLike } from '../../entities';

export interface ClassProjectLikeRepository {
  countClassProjectLike(query: any): Promise<number>;
  createClassProjectLike(classProjectLike: ClassProjectLike): Promise<ClassProjectLike>;
  deleteClassProjectLike(user: string, classProject: string): Promise<void>;
}

export class ClassProjectLikeRepositoryImpl implements ClassProjectLikeRepository {
  private classProjectLikeModel = getModelForClass(ClassProjectLike);

  async countClassProjectLike(query: any): Promise<number> {
    return await this.classProjectLikeModel.countDocuments(query);
  }
  async createClassProjectLike(classProjectLike: ClassProjectLike): Promise<ClassProjectLike> {
    return await this.classProjectLikeModel.create(classProjectLike);
  }
  async deleteClassProjectLike(user: string, classProject: string): Promise<void> {
    await this.classProjectLikeModel.deleteOne({ user, classProject });
  }
}
