import { User } from "entities";
import { UserRepositoryImpl } from "../../repositories/userRepository"
import { UserService } from "../../services/userService";

const getAllUsersAction = async (): Promise<User[]> => {
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);

    return await userService.getAllUsers();
}

export default getAllUsersAction;