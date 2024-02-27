import { MiddlewareFn } from "type-graphql";
import jwt from 'jsonwebtoken';
require('dotenv').config()
import { User } from '../entities';
import { UserRepositoryImpl } from "../repositories";
import { UserService } from "../services";

const JWT_SECRET = process.env.JWT_SECRET;

const UserMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  if(!context.authorization) {
    throw new Error('Invalid token')
  }

  let token = context.authorization;
  if (token.startsWith("Bearer ")){
    token = token.substring(7, token.length);
  }
  
  const payload:any = jwt.verify(token, JWT_SECRET);
  
  const user = await userService.getUserById(payload.user._id);

  if (!user) {
    throw new Error('Invalid token')
  }
  
  return next();
}

export default UserMiddleware;
