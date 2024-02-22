import { UserRepositoryImpl } from "../../repositories/userRepository"
import { UserService } from "../../services/userService";
import { PaginationInput } from "../../typeDefs";
import { ListUsersResponse } from "../../entities/user";

const getAllUsersAction = async (pager: PaginationInput): Promise<ListUsersResponse> => {
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);

    return await userService.getAllUsers(pager);
}

export default getAllUsersAction;