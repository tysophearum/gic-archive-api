import { ThesisFeedback, UpdateThesisFeedbackInput, User } from '../../../entities';
import { ThesisFeedbackRepositoryImpl, ThesisRepositoryImpl } from '../../../repositories';
import { ThesisFeedbackService, ThesisService } from '../../../services';

const updateThesisFeedbackAction = async (user: User, updateThesisFeedbackInput: UpdateThesisFeedbackInput) => {
  const thesisFeedbackService = new ThesisFeedbackService(new ThesisFeedbackRepositoryImpl());
  const thesisService = new ThesisService(new ThesisRepositoryImpl());

  let thesisFeedback = await thesisFeedbackService.getThesisFeedbackById(updateThesisFeedbackInput.id);
  if (!thesisFeedback) {
    throw new Error('Thesis feedback not found');
  }
  if (user._id.toString() !== thesisFeedback.user) {
    throw new Error('You are not authorized to update this feedback');
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

  thesisFeedback.feedback = updateThesisFeedbackInput.feedback;

  return await thesisFeedbackService.updateThesisFeedback(thesisFeedback);
};

export default updateThesisFeedbackAction;
