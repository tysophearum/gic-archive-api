import { Hello } from "../entities"
import { getModelForClass } from '@typegoose/typegoose';

export interface HelloRepository {
    getAllHellos(): Promise<Hello[]>
    createHello(hello: Hello): Promise<Hello>
}

export class HelloRepositoryImpl implements HelloRepository {
    private helloModel = getModelForClass(Hello)

    async getAllHellos(): Promise<Hello[]> {
        return await this.helloModel.find().exec();
    }

    async createHello(hello: Hello): Promise<Hello> {
        return await this.helloModel.create(hello);
    }
}