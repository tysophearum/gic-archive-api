import { ClassProjectLike } from '../../entities';
import { ClassProjectLikeRepository, ClassProjectRepositoryImpl } from '../../repositories';
import { ClassProjectService } from './classProjectService';

export class ClassProjectLikeService {
  private classProjectLikeRepository: ClassProjectLikeRepository;
  private classProjectService = new ClassProjectService(new ClassProjectRepositoryImpl());

  constructor(classProjectLikeRepository: ClassProjectLikeRepository) {
    this.classProjectLikeRepository = classProjectLikeRepository;
  }

  async like(classProjectLike: ClassProjectLike) {
    const classProjectLikeCount = await this.classProjectLikeRepository.countClassProjectLike({
      user: classProjectLike.user,
      classProject: classProjectLike.classProject,
    });

    if (classProjectLikeCount > 0) {
      await this.classProjectLikeRepository.deleteClassProjectLike(classProjectLike.user, classProjectLike.classProject);
      return await this.classProjectService.decrementClassProjectLike(classProjectLike.classProject);
    } else {
      await this.classProjectLikeRepository.createClassProjectLike(classProjectLike);
      return await this.classProjectService.incrementClassProjectLike(classProjectLike.classProject);
    }
  }

  async hasLiked(user: string, classProject: string) {
    const likeCount = await this.classProjectLikeRepository.countClassProjectLike({ user, classProject });
    const a: boolean = likeCount > 0;
    return a;
  }
}
