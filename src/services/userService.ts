import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    private userRepository: UserRepository

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(user: User) {
        return await this.userRepository.createUser(user);
    }

    async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.findUserById(id);
    }
}