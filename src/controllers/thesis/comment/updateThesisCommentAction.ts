import { ThesisComment, UpdateThesisCommentInput } from "../../../entities";
import { ThesisCommentRepositoryImpl } from "../../../repositories";
import { ThesisCommentService } from "../../../services";

const updateThesisCommentAction = async (userId: string, updateThesisCommentInput: UpdateThesisCommentInput) => {
  const thesisCommentService = new ThesisCommentService(
    new ThesisCommentRepositoryImpl(),
  );

  let thesisComment = await thesisCommentService.getThesisCommentById(updateThesisCommentInput.id);
  if (!thesisComment) {
    throw new Error("Thesis comment not found");
  }
  if (userId !== thesisComment.user) {
    throw new Error("You are not authorized to update this comment");
  }
  
  thesisComment.comment = updateThesisCommentInput.comment;

  return await thesisCommentService.updateThesisComment(thesisComment);
}

export default updateThesisCommentAction;