import { User } from '../../../entities';
import { ThesisFeedbackRepositoryImpl, ThesisRepositoryImpl } from '../../../repositories';
import { ThesisFeedbackService, ThesisService } from '../../../services';

const deleteThesisFeedbackAction = async (user: User, id: string) => {
  const thesisFeedbackService = new ThesisFeedbackService(new ThesisFeedbackRepositoryImpl());
  const thesisService = new ThesisService(new ThesisRepositoryImpl());

  const thesisFeedback = await thesisFeedbackService.getThesisFeedbackById(id);
  if (!thesisFeedback) {
    throw new Error('Thesis feedback not found');
  }
  if (user._id.toString() !== thesisFeedback.user) {
    throw new Error('You are not authorized to delete this feedback');
  }

  const findThesis = await thesisService.getThesisById(thesisFeedback.thesis);
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

  return await thesisFeedbackService.deleteThesisFeedback(id);
};

export default deleteThesisFeedbackAction;
