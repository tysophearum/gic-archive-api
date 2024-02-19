import { Hello } from "../entities";
import { HelloRepository } from "../repositories";

export class HelloService {
    private helloRepository: HelloRepository

    constructor(helloRepository: HelloRepository) {
        this.helloRepository = helloRepository;
    }

    async getAllHellos(): Promise<Hello[]> {
        return await this.helloRepository.getAllHellos();
    }

    async createHello(hello: Hello): Promise<Hello> {
        return await this.helloRepository.createHello(hello);
    }
}