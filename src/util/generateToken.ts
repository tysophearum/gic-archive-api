import jwt from 'jsonwebtoken';
require('dotenv').config()
import { User } from '../entities';

const JWT_SECRET = process.env.JWT_SECRET;

export default function generateToken (user: User): string {
  return jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '10h' });
};