import { ClassProjectFeedbackService, ClassProjectService } from '../../../services';
import { ClassProjectFeedbackRepositoryImpl, ClassProjectRepositoryImpl } from '../../../repositories';
import { CreateClassProjectFeedbackInput, ClassProjectFeedback, ClassProjectFeedbackResponse, User } from '../../../entities';

const createClassProjectFeedbackAction = async (user: User, classProjectFeedbackInput: CreateClassProjectFeedbackInput) => {
  const classProjectFeedbackService = new ClassProjectFeedbackService(new ClassProjectFeedbackRepositoryImpl());
  const classProjectService = new ClassProjectService(new ClassProjectRepositoryImpl());

  const { classProject, feedback } = classProjectFeedbackInput;
  const findClassProject = await classProjectService.getClassProjectById(classProject);
  if (!findClassProject) {
    throw new Error('ClassProject not found');
  }

  if (user.role == 'student') {
    if (user._id.toString() != findClassProject.user._id.toString()) {
      throw new Error('You are not authorize for this action');
    }
  } 

  const newClassProjectFeedback: ClassProjectFeedback = {
    ...classProjectFeedbackInput,
    user: user._id.toString(),
  };

  const classProjectFeedback: ClassProjectFeedbackResponse = await classProjectFeedbackService.createClassProjectFeedback(newClassProjectFeedback);

  return classProjectFeedback;
};

export default createClassProjectFeedbackAction;
