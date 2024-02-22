import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../entities/user";

export interface UserRepository {
    createUser(user: User): Promise<User>
    findAllUsers(): Promise<User[]>
    findUserById(id: string): Promise<User>
}

export class UserRepositoryImpl implements UserRepository {
    private userModel = getModelForClass(User);

    async createUser(user: User): Promise<User> {
        return await this.userModel.create(user)
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }
}