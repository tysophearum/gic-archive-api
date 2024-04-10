import { User } from '../../../entities';
import { ThesisCommentRepositoryImpl } from '../../../repositories';
import { ThesisCommentService } from '../../../services';

const deleteThesisCommentAction = async (user: User, id: string) => {
  const thesisCommentService = new ThesisCommentService(new ThesisCommentRepositoryImpl());

  const thesisComment = await thesisCommentService.getThesisCommentById(id);
  if (!thesisComment) {
    throw new Error('Thesis comment not found');
  }
  if (user._id.toString() !== thesisComment.user) {
    throw new Error('You are not authorized to delete this comment');
  }

  return await thesisCommentService.deleteThesisComment(id);
};

export default deleteThesisCommentAction;
