import { FileUpload } from 'graphql-upload-minimal';
import { ContactInfo, User, UserRegisterInput, UserResponse } from '../../entities';
import { UserRepositoryImpl } from '../../repositories/userRepository';
import { UserService } from '../../services/userService';
import saveFile from '../../util/saveFileUtil';
import bcrypt from 'bcrypt';
import generateToken from '../../util/generateToken';

const registerUserAction = async (
  { name, studentId, email, gender, password, contacts }: UserRegisterInput,
): Promise<UserResponse> => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  if (!name || !studentId || !email || !password) {
    throw new Error('Invalid data');
  }

  let image = '';
  let coverImage = '';

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = {
    name,
    studentId,
    email,
    gender,
    password: hashedPassword,
    contacts,
    image,
    role: 'student',
    coverImage
  };

  const registeredUser = await userService.register(user);
  const token = generateToken(registeredUser);

  return {
    user: registeredUser,
    token,
  };
};

export default registerUserAction;
