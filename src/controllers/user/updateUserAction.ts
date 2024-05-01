import { UserService } from "../../services";
import { UserRepositoryImpl } from "../../repositories";
import { UpdateUserInput, User } from "../../entities/user";

const updateUserAction = async (id: string, updateUserInput: UpdateUserInput): Promise<User> => {
  const userRepositoryImpl = new UserRepositoryImpl();
  const userService = new UserService(userRepositoryImpl);

  const {name, studentId, bio, gender, email, contacts, tags} = updateUserInput;

  if (!id) {
    throw new Error("User id is required");
  }

  let user = await userService.getUserById(id);
  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;
  user.studentId = studentId;
  user.bio = bio;
  user.gender = gender;
  user.email = email;
  user.contacts = contacts;
  user.tags = tags;

  return await userService.updateUser(user);
}

export default updateUserAction;