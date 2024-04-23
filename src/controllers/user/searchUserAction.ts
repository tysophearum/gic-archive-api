import { UserRepositoryImpl } from "../../repositories";
import { MinUser } from "../../entities";
import { UserService } from "../../services";

const searchUserAction = async (name: string): Promise<MinUser[]> => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);
  
  if (!name) {
    return [];
  }

  return await userService.searchUsers(name);
}

export default searchUserAction;