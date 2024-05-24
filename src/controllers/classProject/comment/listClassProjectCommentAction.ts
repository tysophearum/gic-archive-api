import { PaginationInput } from '../../../typeDefs';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { ClassProjectCommentService } from '../../../services';
import { ListClassProjectCommentResponse } from '../../../entities';
import { getObjectSignedUrl } from '../../../util/s3';

const listClassProjectCommentAction = async (pager: PaginationInput, query: any): Promise<ListClassProjectCommentResponse> => {
  const classProjectCommentRepository = new ClassProjectCommentRepositoryImpl();
  const classProjectCommentService = new ClassProjectCommentService(classProjectCommentRepository);

  let comments = await classProjectCommentService.getClassProjectComment(pager, query);

  for (let i = 0; i < comments.comment.length; i++) {
    comments.comment[i].user.image = await getObjectSignedUrl(comments.comment[i].user.image);
  }

  return comments;
};

export default listClassProjectCommentAction;
