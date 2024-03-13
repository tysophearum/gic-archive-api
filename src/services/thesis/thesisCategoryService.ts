import { ThesisCategory } from "../../entities";
import { ThesisCategoryRepository } from "../../repositories";

export class ThesisCategoryService {
    private thesisCategoryRepository: ThesisCategoryRepository

    constructor (thesisCategoryRepository: ThesisCategoryRepository) {
        this.thesisCategoryRepository = thesisCategoryRepository;
    }

    async createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
        return await this.thesisCategoryRepository.createThesisCategory(thesisCategory);
    }

    async getThesisCategory(query: any=null): Promise<ThesisCategory[]> {
        return await this.thesisCategoryRepository.findThesisCategory(query);
    }

    async getThesisCategoryById(id: string): Promise<ThesisCategory> {
        return await this.thesisCategoryRepository.getThesisCategoryById(id);
    }
}