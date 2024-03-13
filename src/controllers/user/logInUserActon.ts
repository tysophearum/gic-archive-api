import { UserResponse } from "../../entities";
import { UserRepositoryImpl } from "../../repositories/userRepository";
import { UserService } from "../../services/userService";
import bcrypt from 'bcrypt';
import generateToken from "../../util/generateToken";
import { ListUsersResponse } from "../../entities/user";

const logInUserAction = async (username: string, password: string): Promise<UserResponse> => {
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);

    if(!username || !password) {
        throw new Error('Invalid data');
    }

    const usersResponse: ListUsersResponse = await userService.getUsers(undefined, {username});
    const user = usersResponse.users[0];
    
    if (!user) {
        throw new Error('Invalid username');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user);

    return {
        user,
        token,
    }
}

export default logInUserAction;