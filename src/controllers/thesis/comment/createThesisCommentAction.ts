import { ThesisCommentService } from '../../../services';
import { ThesisCommentRepositoryImpl } from '../../../repositories';
import { CreateThesisCommentInput, ThesisComment, ThesisCommentResponse } from '../../../entities';

const createThesisCommentAction = async (user: string, thesisCommentInput: CreateThesisCommentInput) => {
  const thesisCommentService = new ThesisCommentService(
    new ThesisCommentRepositoryImpl(),
  );

  const newThesisComment: ThesisComment = {
    ...thesisCommentInput,
    user
  }

  const thesisComment: ThesisCommentResponse = await thesisCommentService.createThesisComment(newThesisComment);

  return thesisComment;
}

export default createThesisCommentAction;