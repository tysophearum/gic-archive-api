import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { UserService } from '../services';
import { UserRepositoryImpl } from '../repositories';

const JWT_SECRET = process.env.JWT_SECRET;
const userService = new UserService(new UserRepositoryImpl());

const OptionalMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
  let token = context.authorization;
  if (!token) return next();

  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }

  const payload: any = jwt.verify(token, JWT_SECRET);

  const user = await userService.getUserById(payload.user._id);

  context.user = user;

  return next();
};

export default OptionalMiddleware;
