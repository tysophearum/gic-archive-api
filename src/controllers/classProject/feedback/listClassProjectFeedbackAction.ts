import { PaginationInput } from '../../../typeDefs';
import { ClassProjectFeedbackRepositoryImpl, ClassProjectRepositoryImpl } from '../../../repositories';
import { ClassProjectFeedbackService, ClassProjectService } from '../../../services';
import { ListClassProjectFeedbackResponse, User } from '../../../entities';

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
  // else if (user.role == 'teacher') {
  //   if (findClassProject.teacher._id.toString() != user._id.toString()) {
  //     throw new Error('You are not authorize for this action');
  //   }
  // }

  return await classProjectFeedbackService.getClassProjectFeedback(pager, query);
};

export default listClassProjectFeedbackAction;
