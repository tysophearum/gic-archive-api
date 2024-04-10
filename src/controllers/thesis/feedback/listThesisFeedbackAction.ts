import { PaginationInput } from '../../../typeDefs';
import { ThesisFeedbackRepositoryImpl, ThesisRepositoryImpl } from '../../../repositories';
import { ThesisFeedbackService, ThesisService } from '../../../services';
import { ListThesisFeedbackResponse, User } from '../../../entities';

const listThesisFeedbackAction = async (
  user: User,
  pager: PaginationInput,
  query: any,
): Promise<ListThesisFeedbackResponse> => {
  const thesisFeedbackRepository = new ThesisFeedbackRepositoryImpl();
  const thesisFeedbackService = new ThesisFeedbackService(thesisFeedbackRepository);
  const thesisService = new ThesisService(new ThesisRepositoryImpl());

  const { thesis } = query;
  const findThesis = await thesisService.getThesisById(thesis);
  if (!findThesis) {
    throw new Error('Thesis not found');
  }

  if (user.role == 'student') {
    if (user._id.toString() != findThesis.user._id.toString()) {
      throw new Error('You are not authorize for this action');
    }
  } else if (user.role == 'teacher') {
    if (findThesis.teacher._id.toString() != user._id.toString()) {
      throw new Error('You are not authorize for this action');
    }
  }

  return await thesisFeedbackService.getThesisFeedback(pager, query);
};

export default listThesisFeedbackAction;
