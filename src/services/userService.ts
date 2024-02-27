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

    async getUsers(pager: PaginationInput=null, query: any=null): Promise<ListUsersResponse> {
        if (!pager) {
            pager.limit = 1;
            pager.page = 1;
        }
        const users = await this.userRepository.findUsers(pager, query);
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