import { UserService } from "../services/userService";
import { UserRepositoryImpl } from "../repositories/userRepository";

export default async function validateUserId(userIds: string) {
    const userRepository = new UserRepositoryImpl()
    const userService = new UserService(userRepository)

    const user = await userService.getUserById(userIds)

    if (!user) {
        return false
    }

    return true
}