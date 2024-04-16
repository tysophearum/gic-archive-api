import { PaginationInput } from '../../../typeDefs';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { ClassProjectCommentService } from '../../../services';
import { ListClassProjectCommentResponse } from '../../../entities';

const listClassProjectCommentAction = async (pager: PaginationInput, query: any): Promise<ListClassProjectCommentResponse> => {
  const classProjectCommentRepository = new ClassProjectCommentRepositoryImpl();
  const classProjectCommentService = new ClassProjectCommentService(classProjectCommentRepository);

  return await classProjectCommentService.getClassProjectComment(pager, query);
};

export default listClassProjectCommentAction;
