import { ThesisCommentService } from '../../../services';
import { ThesisCommentRepositoryImpl } from '../../../repositories';
import { CreateThesisCommentInput, ThesisComment, ThesisCommentResponse, User } from '../../../entities';

const createThesisCommentAction = async (user: User, thesisCommentInput: CreateThesisCommentInput) => {
  const thesisCommentService = new ThesisCommentService(new ThesisCommentRepositoryImpl());

  const newThesisComment: ThesisComment = {
    ...thesisCommentInput,
    user: user._id.toString(),
  };

  const thesisComment: ThesisCommentResponse = await thesisCommentService.createThesisComment(newThesisComment);

  return thesisComment;
};

export default createThesisCommentAction;
