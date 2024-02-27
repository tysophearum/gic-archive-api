import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../entities/user";
import { PaginationInput } from "../typeDefs";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUsers(pager: PaginationInput, query: any): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  countUsers(query?: unknown): Promise<number>
}

export class UserRepositoryImpl implements UserRepository {
  private userModel = getModelForClass(User);

  async countUsers(): Promise<number> {
    return await this.userModel.countDocuments();
  }

  async createUser(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findUsers({ page, limit }: PaginationInput, query: any): Promise<User[]> {
    const skip = (page - 1) * limit;
    return await this.userModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
}
