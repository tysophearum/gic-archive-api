import { PaginationInput } from "../typeDefs";
import { ListUsersResponse, User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import calculatePagination from "../util/calculatePaginationResponse";


export class UserService {
    private userRepository: UserRepository

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(user: User) {
        return await this.userRepository.createUser(user);
    }

    async getAllUsers(pager: PaginationInput): Promise<ListUsersResponse> {
        const users = await this.userRepository.findAllUsers(pager);
        const totalUsers = await this.userRepository.countUsers();
        const pagination = calculatePagination(pager, totalUsers);
        
        return {
            users,
            pagination
        }
    }

    async getUserById(id: string) {
        return await this.userRepository.findUserById(id);
    }
}