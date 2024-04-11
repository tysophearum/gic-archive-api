import { ThesisLike } from '../../entities';
import { ThesisLikeRepository, ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from './thesisService';

export class ThesisLikeService {
  private thesisLikeRepository: ThesisLikeRepository;
  private thesisService = new ThesisService(new ThesisRepositoryImpl());

  constructor(thesisLikeRepository: ThesisLikeRepository) {
    this.thesisLikeRepository = thesisLikeRepository;
  }

  async like(thesisLike: ThesisLike) {
    const thesisLikeCount = await this.thesisLikeRepository.countThesisLike({
      user: thesisLike.user,
      thesis: thesisLike.thesis,
    });

    if (thesisLikeCount > 0) {
      await this.thesisLikeRepository.deleteThesisLike(thesisLike.user, thesisLike.thesis);
      return await this.thesisService.decrementThesisLike(thesisLike.thesis);
    } else {
      await this.thesisLikeRepository.createThesisLike(thesisLike);
      return await this.thesisService.incrementThesisLike(thesisLike.thesis);
    }
  }

  async hasLiked(user: string, thesis: string) {
    const likeCount = await this.thesisLikeRepository.countThesisLike({ user, thesis });
    const a: boolean = likeCount > 0;
    return a;
  }
}
