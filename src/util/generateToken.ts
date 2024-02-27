import jwt from 'jsonwebtoken';
require('dotenv').config()
import { User } from '../entities';

const JWT_SECRET = process.env.JWT_SECRET;

export default function generateToken (user: User): string {
  return jwt.sign({user: user}, JWT_SECRET, { expiresIn: '10h' });
};