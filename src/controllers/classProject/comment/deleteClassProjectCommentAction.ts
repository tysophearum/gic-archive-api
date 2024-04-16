import { User } from '../../../entities';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { ClassProjectCommentService } from '../../../services';

const deleteClassProjectCommentAction = async (user: User, id: string) => {
  const classProjectCommentService = new ClassProjectCommentService(new ClassProjectCommentRepositoryImpl());

  const classProjectComment = await classProjectCommentService.getClassProjectCommentById(id);
  if (!classProjectComment) {
    throw new Error('ClassProject comment not found');
  }
  if (user._id.toString() !== classProjectComment.user) {
    throw new Error('You are not authorized to delete this comment');
  }

  return await classProjectCommentService.deleteClassProjectComment(id);
};

export default deleteClassProjectCommentAction;
