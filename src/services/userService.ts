import { PaginationInput } from '../typeDefs';
import { ListUsersResponse, User, MinUser } from '../entities/user';
import { UserRepository } from '../repositories/userRepository';
import calculatePagination from '../util/calculatePaginationResponse';
require('dotenv').config();

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: User) {
    return await this.userRepository.createUser(user);
  }

  async getUsers(
    pager: PaginationInput = { page: 1, limit: Number(process.env.MAX_LIMIT) },
    query: any = null,
  ): Promise<ListUsersResponse> {
    const users = await this.userRepository.findUsers(pager, query);
    const totalUsers = await this.userRepository.countUsers();
    const pagination = calculatePagination(pager, totalUsers);

    return {
      users,
      pagination,
    };
  }

  async getUserById(id: string) {
    return await this.userRepository.findUserById(id);
  }

  async searchUsers(name: string): Promise<MinUser[]> {
    return await this.userRepository.searchUsers(name);
  }
}
