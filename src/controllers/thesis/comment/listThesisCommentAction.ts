import { PaginationInput } from '../../../typeDefs';
import { ThesisCommentRepositoryImpl } from '../../../repositories';
import { ThesisCommentService } from '../../../services';
import { ListThesisCommentResponse } from '../../../entities';

const listThesisCommentAction = async (pager: PaginationInput, query: any): Promise<ListThesisCommentResponse> => {
  const thesisCommentRepository = new ThesisCommentRepositoryImpl();
  const thesisCommentService = new ThesisCommentService(thesisCommentRepository);

  return await thesisCommentService.getThesisComment(pager, query);
};

export default listThesisCommentAction;
