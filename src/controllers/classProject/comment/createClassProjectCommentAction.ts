import { ClassProjectCommentService } from '../../../services';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { CreateClassProjectCommentInput, ClassProjectComment, ClassProjectCommentResponse, User } from '../../../entities';

const createClassProjectCommentAction = async (user: User, classProjectCommentInput: CreateClassProjectCommentInput) => {
  const classProjectCommentService = new ClassProjectCommentService(new ClassProjectCommentRepositoryImpl());

  const newClassProjectComment: ClassProjectComment = {
    ...classProjectCommentInput,
    user: user._id.toString(),
  };

  const classProjectComment: ClassProjectCommentResponse = await classProjectCommentService.createClassProjectComment(newClassProjectComment);

  return classProjectComment;
};

export default createClassProjectCommentAction;
