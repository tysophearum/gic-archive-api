import { PaginationInput } from '../../../typeDefs';
import { ClassProjectFeedbackRepositoryImpl, ClassProjectRepositoryImpl } from '../../../repositories';
import { ClassProjectFeedbackService, ClassProjectService } from '../../../services';
import { ListClassProjectFeedbackResponse, User } from '../../../entities';
import { getObjectSignedUrl } from '../../../util/s3';

const listClassProjectFeedbackAction = async (
  user: User,
  pager: PaginationInput,
  query: any,
): Promise<ListClassProjectFeedbackResponse> => {
  const classProjectFeedbackRepository = new ClassProjectFeedbackRepositoryImpl();
  const classProjectFeedbackService = new ClassProjectFeedbackService(classProjectFeedbackRepository);
  const classProjectService = new ClassProjectService(new ClassProjectRepositoryImpl());

  const { classProject } = query;
  const findClassProject = await classProjectService.getClassProjectById(classProject);
  if (!findClassProject) {
    throw new Error('ClassProject not found');
  }

  if (user.role == 'student') {
    if (user._id.toString() != findClassProject.user._id.toString()) {
      throw new Error('You are not authorize for this action');
    }
  }

  let feedbacks = await classProjectFeedbackService.getClassProjectFeedback(pager, query);

  const promises = feedbacks.feedbacks.map(async (feedback) => {
    feedback.user.image = await getObjectSignedUrl(feedback.user.image);
  });

  await Promise.all(promises);

  return feedbacks;
};

export default listClassProjectFeedbackAction;
