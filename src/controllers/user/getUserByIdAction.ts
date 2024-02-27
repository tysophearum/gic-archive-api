import { UserService } from "../../services"
import { UserRepositoryImpl } from "../../repositories"

const getUserByIdAction = async (userId: string) => {
    if (!userId) {
        throw new Error("User id is required")
    }

    if (typeof userId !== "string") {
        throw new Error("User id must be a string")
    }

    const userRepository = new UserRepositoryImpl()
    const userService = new UserService(userRepository)

    const user = await userService.getUserById(userId)

    return user
}

export default getUserByIdAction