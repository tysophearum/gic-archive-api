import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { UserService } from '../services';
import { UserRepositoryImpl } from '../repositories';

const JWT_SECRET = process.env.JWT_SECRET;
const userService = new UserService(new UserRepositoryImpl());

const StudentMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
  if (!context.authorization) {
    throw new Error('Invalid token');
  }

  let token = context.authorization;
  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }

  try {
    let payload: any;
    try {
      payload  = jwt.verify(token, JWT_SECRET);
      // Handle payload
    } catch (error) {
      console.error('Error verifying token:', error);
      // Handle error
    }

    // Check if the payload contains the necessary user ID
    if (!payload || !payload.user || !payload.user._id) {
      throw new Error('Invalid token');
    }

    const user = await userService.getUserById(payload.user._id);
    if (!user) {
      throw new Error('Invalid token');
    }
    // If the token is valid, you can attach the user ID to the context
    context.user = user;

    // Continue with the next middleware or resolver
    return next();
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default StudentMiddleware;
