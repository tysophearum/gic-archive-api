// import { FileUpload } from "graphql-upload-minimal";
// import { User, UserRegisterInput, UserResponse } from "../../entities";
// import { UserRepositoryImpl } from "../../repositories/userRepository";
// import { UserService } from "../../services/userService";
// import saveFile from "../../util/saveFileUtil";
// import bcrypt from 'bcrypt';
// import generateToken from "../../util/generateToken";

// const logInUserAction = async (username: string, password: string): Promise<UserResponse> => {
//     const userRepository = new UserRepositoryImpl();
//     const userService = new UserService(userRepository);

//     if(!username || !password) {
//         throw new Error('Invalid data');
//     }

//     const users = await userService.getUsers(null, {username});
    
//     const token = generateToken(registeredUser);

//     return {
//         user,
//         token,
//     }
// }

// export default registerUserAction;