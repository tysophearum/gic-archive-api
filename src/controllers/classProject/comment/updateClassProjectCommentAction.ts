import { ClassProjectComment, UpdateClassProjectCommentInput, User } from '../../../entities';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { ClassProjectCommentService } from '../../../services';

const updateClassProjectCommentAction = async (user: User, updateClassProjectCommentInput: UpdateClassProjectCommentInput) => {
  const classProjectCommentService = new ClassProjectCommentService(new ClassProjectCommentRepositoryImpl());

  let classProjectComment = await classProjectCommentService.getClassProjectCommentById(updateClassProjectCommentInput.id);
  if (!classProjectComment) {
    throw new Error('ClassProject comment not found');
  }
  if (user._id.toString() !== classProjectComment.user) {
    throw new Error('You are not authorized to update this comment');
  }

  classProjectComment.comment = updateClassProjectCommentInput.comment;

  return await classProjectCommentService.updateClassProjectComment(classProjectComment);
};

export default updateClassProjectCommentAction;
