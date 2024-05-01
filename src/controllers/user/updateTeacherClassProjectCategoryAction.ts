import { UserService } from "../../services";
import { UserRepositoryImpl } from "../../repositories";
import { UpdateUserInput, User } from "../../entities/user";

const updateTeacherClassProjectCategoryAction = async (teacherId: string, categoryIds: string[]): Promise<User> => {
  const userRepositoryImpl = new UserRepositoryImpl();
  const userService = new UserService(userRepositoryImpl);

  if (!teacherId) {
    throw new Error("Teacher id is required");
  }

  let user:any = await userService.getUserById(teacherId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.role != 'teacher') {
    throw new Error("User is not a teacher");
  }

  user.classProjectCategory = categoryIds;

  return await userService.updateUser(user);
}

export default updateTeacherClassProjectCategoryAction;