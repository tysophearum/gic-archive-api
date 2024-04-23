import { User } from '../../../entities';
import { ClassProjectFeedbackRepositoryImpl, ClassProjectRepositoryImpl } from '../../../repositories';
import { ClassProjectFeedbackService, ClassProjectService } from '../../../services';

const deleteClassProjectFeedbackAction = async (user: User, id: string) => {
  const classProjectFeedbackService = new ClassProjectFeedbackService(new ClassProjectFeedbackRepositoryImpl());
  const classProjectService = new ClassProjectService(new ClassProjectRepositoryImpl());

  const classProjectFeedback = await classProjectFeedbackService.getClassProjectFeedbackById(id);
  if (!classProjectFeedback) {
    throw new Error('ClassProject feedback not found');
  }
  if (user._id.toString() !== classProjectFeedback.user) {
    throw new Error('You are not authorized to delete this feedback');
  }

  const findClassProject = await classProjectService.getClassProjectById(classProjectFeedback.classProject);
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

  return await classProjectFeedbackService.deleteClassProjectFeedback(id);
};

export default deleteClassProjectFeedbackAction;
