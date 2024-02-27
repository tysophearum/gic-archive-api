import { FileUpload } from "graphql-upload-minimal";
import { User, UserRegisterInput, UserResponse } from "../../entities";
import { UserRepositoryImpl } from "../../repositories/userRepository";
import { UserService } from "../../services/userService";
import saveFile from "../../util/saveFileUtil";
import bcrypt from 'bcrypt';
import generateToken from "../../util/generateToken";

const registerUserAction = async ({username, password, confirm_password, email }: UserRegisterInput, file: FileUpload): Promise<UserResponse> => {
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);

    if(!username || !password || !email) {
        throw new Error('Invalid data');
    }

    if(password !== confirm_password) {
        throw new Error('Passwords do not match');
    }

    let picture = '';
    if(file){
        picture = await saveFile(file)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
        username,
        password: hashedPassword,
        email,
        picture,
    }

    const registeredUser = await userService.register(user);
    const token = generateToken(registeredUser);

    return {
        user: registeredUser,
        token,
    }
}

export default registerUserAction;