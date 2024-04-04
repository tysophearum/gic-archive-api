import { FileUpload } from 'graphql-upload-minimal';
import { ContactInfo, User, UserRegisterInput, UserResponse } from '../../entities';
import { UserRepositoryImpl } from '../../repositories/userRepository';
import { UserService } from '../../services/userService';
import saveFile from '../../util/saveFileUtil';
import bcrypt from 'bcrypt';
import generateToken from '../../util/generateToken';

const registerUserAction = async (
  { firstName, lastName, email, gender, password, contacts }: UserRegisterInput,
  file: FileUpload,
): Promise<UserResponse> => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  if (!firstName || !lastName || !email || !password) {
    throw new Error('Invalid data');
  }

  let image = '';
  if (file) {
    image = await saveFile(file);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = {
    firstName,
    lastName,
    email,
    gender,
    password: hashedPassword,
    contacts,
    image,
    role: 'student',
  };

  const registeredUser = await userService.register(user);
  const token = generateToken(registeredUser);

  return {
    user: registeredUser,
    token,
  };
};

export default registerUserAction;
