import { PaginationInput } from '../../../typeDefs';
import { ClassProjectCommentRepositoryImpl } from '../../../repositories';
import { ClassProjectCommentService } from '../../../services';
import { ListClassProjectCommentResponse } from '../../../entities';
import { getObjectSignedUrl } from '../../../util/s3';

const listClassProjectCommentAction = async (pager: PaginationInput, query: any): Promise<ListClassProjectCommentResponse> => {
  const classProjectCommentRepository = new ClassProjectCommentRepositoryImpl();
  const classProjectCommentService = new ClassProjectCommentService(classProjectCommentRepository);

  let comments = await classProjectCommentService.getClassProjectComment(pager, query);

  const promises = comments.comment.map(async (comment) => {
    comment.user.image = await getObjectSignedUrl(comment.user.image);
  });

  await Promise.all(promises);

  return comments;
};

export default listClassProjectCommentAction;
