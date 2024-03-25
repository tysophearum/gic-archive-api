import { ObjectType, Field as GqlField, InputType, ID, Float } from "type-graphql";
import { Prop as DBField } from "@typegoose/typegoose";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { Pagination } from "../typeDefs";
import { Types } from "mongoose";

@ObjectType()
class ContactInfo {
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
  @DBField({ type: String, required: true, unique: true })
  firstName: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true, unique: true })
  lastName: string;

  @GqlField(() => String, { nullable: false })
  @DBField({ type: String, required: true, unique: true })
  username: string;

  @DBField({ type: String, required: true })
  password: string;

  @GqlField(() => [ContactInfo], { nullable: true })
  @DBField({ type: [ContactInfo], _id: false, default: [] })
  contacts: ContactInfo[];

  @DBField({ type: String, required: false })
  image: string

  @GqlField(() => String)
  @DBField({ type: String, enum: ['student', 'teacher', 'admin'], default: 'user' })
  role: string;

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
  pagination: Pagination
}

@InputType()
export class UserRegisterInput {
  @GqlField(() => String)
  @IsString()
  firstName: string;

  @GqlField(() => String)
  @IsString()
  lastName: string;

  @GqlField(() => String)
  @IsString()
  username: string;

  @GqlField(() => String)
  @IsString()
  password: string;

  @GqlField(() => String)
  @IsString()
  confirm_password: string;

  @IsOptional()
  @GqlField(() => [ContactInfo])
  contacts: ContactInfo[];
}