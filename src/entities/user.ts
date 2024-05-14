import { ObjectType, Field as GqlField, InputType, ID, Float } from 'type-graphql';
import { Prop as DBField } from '@typegoose/typegoose';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Pagination } from '../typeDefs';
import { Types } from 'mongoose';
import { ClassProjectCategory } from '../entities';

@ObjectType()
export class ContactInfo {
  @GqlField(() => String)
  @DBField({ type: String, required: true, unique: false })
  type: string;

  @GqlField(() => String)
  @DBField({ type: String, required: true, unique: false })
  value: string;
}

@InputType()
class ContactInfoInput {
  @GqlField(() => String)
  type: string;

  @GqlField(() => String)
  value: string;
}

@ObjectType()
export class User {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  name: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true })
  studentId: string;

  @GqlField(() => String, { nullable: true })
  @DBField({ type: String, required: false })
  bio?: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true, unique: true, index: true })
  email: string;

  @DBField({ type: String, required: true })
  password: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, enum: ['male', 'female'], default: 'male' })
  gender: string;

  @GqlField(() => [ContactInfo], { nullable: true })
  @DBField({ type: [ContactInfo], _id: false, default: [] })
  contacts: ContactInfo[];

  @GqlField(() => String, { nullable: true })
  @DBField({ type: String, required: false })
  image: string;

  @GqlField(() => String, { nullable: true })
  @DBField({ type: String, required: false })
  coverImage?: string;

  @GqlField(() => String)
  @DBField({ type: String, enum: ['student', 'teacher', 'admin'], default: 'student' })
  role: string;

  @GqlField(() => [String], { nullable: true })
  @DBField({ type: [String], required: false, default: [] })
  tags?: string[];

  @GqlField(() => Float, { name: 'createdAt' })
  @DBField({
    type: Number,
    default: Date.now,
    alias: 'createdAt',
  })
  created_at?: number;

  @GqlField(() => Float, { name: 'updatedAt' })
  @DBField({
    type: Number,
    default: 0,
    alias: 'updatedAt',
  })
  updated_at?: number;
}

@ObjectType()
export class MinUser {
  @GqlField(() => ID, { name: 'id' })
  readonly _id?: Types.ObjectId;

  @GqlField(() => String, { nullable: false })
  name: string;

  @GqlField(() => String, { nullable: false })
  studentId: string;

  @GqlField(() => String, { nullable: false })
  email: string;

  @GqlField(() => String, { nullable: false })
  gender: string;

  @GqlField(() => String, { nullable: true })
  image: string;

  @GqlField(() => Float, { name: 'createdAt' })
  created_at?: number;

  @GqlField(() => Float, { name: 'updatedAt' })
  updated_at?: number;
}

@ObjectType()
export class UserResponse {
  @GqlField(() => User)
  user: User;

  @GqlField(() => String)
  token: string;
}

@ObjectType()
export class ListUsersResponse {
  @GqlField(() => [User])
  users: User[];

  @GqlField(() => Pagination)
  pagination: Pagination;
}

@InputType()
export class UserRegisterInput {
  @GqlField(() => String)
  @IsString()
  name: string;

  @GqlField(() => String)
  @IsString()
  studentId: string;

  @GqlField(() => String)
  @IsEmail()
  email: string;

  @GqlField(() => String)
  @IsString()
  gender: string;

  @GqlField(() => String)
  @IsString()
  password: string;

  @IsOptional()
  @GqlField(() => [ContactInfoInput])
  contacts: ContactInfoInput[];
}

@InputType()
export class UpdateUserInput {
  @GqlField(() => String)
  @IsString()
  name: string;

  @GqlField(() => String)
  @IsString()
  studentId: string;

  @GqlField(() => String, {nullable: true})
  @IsString()
  bio: string;

  @GqlField(() => String)
  @IsString()
  gender: string;

  @GqlField(() => String)
  @IsEmail()
  email: string;

  @IsOptional()
  @GqlField(() => [ContactInfoInput], {nullable: true})
  contacts: ContactInfoInput[];

  @GqlField(() => [String], { nullable: true })
  tags?: string[];
}

@ObjectType()
export class Contribution {
  @GqlField(() => Number)
  classProjectCount: number;

  @GqlField(() => Number)
  thesisCount: number;
}
