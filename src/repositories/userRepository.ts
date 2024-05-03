import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../entities/user';
import { PaginationInput } from '../typeDefs';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUsers(pager: PaginationInput, query: any): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  countUsers(query?: unknown): Promise<number>;
  deleteUser(id: string): Promise<void>;
  updateUser(user: User): Promise<User>;
  searchUsers(name: string): Promise<User[]>;
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
    return await this.userModel.find(query).skip(skip).limit(limit).exec();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUser(user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(user._id, user, { new: true }).exec();
  }
  async searchUsers(name: string): Promise<User[]> {
    return await this.userModel.find({ name: { $regex: name, $options: 'i' } }).limit(8).exec();
  }
}
