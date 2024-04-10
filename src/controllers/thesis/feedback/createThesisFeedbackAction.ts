import { ThesisFeedbackService, ThesisService } from '../../../services';
import { ThesisFeedbackRepositoryImpl, ThesisRepositoryImpl } from '../../../repositories';
import { CreateThesisFeedbackInput, ThesisFeedback, ThesisFeedbackResponse, User } from '../../../entities';

const createThesisFeedbackAction = async (user: User, thesisFeedbackInput: CreateThesisFeedbackInput) => {
  const thesisFeedbackService = new ThesisFeedbackService(new ThesisFeedbackRepositoryImpl());
  const thesisService = new ThesisService(new ThesisRepositoryImpl());

  const { thesis, feedback } = thesisFeedbackInput;
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

  const newThesisFeedback: ThesisFeedback = {
    ...thesisFeedbackInput,
    user: user._id.toString(),
  };

  const thesisFeedback: ThesisFeedbackResponse = await thesisFeedbackService.createThesisFeedback(newThesisFeedback);

  return thesisFeedback;
};

export default createThesisFeedbackAction;
