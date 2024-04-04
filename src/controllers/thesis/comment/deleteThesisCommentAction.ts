import { ThesisCommentRepositoryImpl } from "../../../repositories";
import { ThesisCommentService } from "../../../services";

const deleteThesisCommentAction = async (userId: string, id: string) => {
  const thesisCommentService = new ThesisCommentService(
    new ThesisCommentRepositoryImpl(),
  );

  const thesisComment = await thesisCommentService.getThesisCommentById(id);
  if (!thesisComment) {
    throw new Error("Thesis comment not found");
  }
  if (userId !== thesisComment.user) {
    throw new Error("You are not authorized to delete this comment");
  }

  return await thesisCommentService.deleteThesisComment(id);
}

export default deleteThesisCommentAction;