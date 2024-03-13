import { getModelForClass } from "@typegoose/typegoose";
import { ThesisCategory } from "../../entities";

export interface ThesisCategoryRepository {
    createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory>;
    findThesisCategory(query: any): Promise<ThesisCategory[]>;
    getThesisCategoryById(id: string): Promise<ThesisCategory>;
}

export class ThesisCategoryRepositoryImpl implements ThesisCategoryRepository {
    private thesisCategoryModel = getModelForClass(ThesisCategory);

    async createThesisCategory(thesisCategory: ThesisCategory): Promise<ThesisCategory> {
        return await this.thesisCategoryModel.create(thesisCategory);
    }

    async findThesisCategory(query: any): Promise<ThesisCategory[]> {
        return await this.thesisCategoryModel.find(query);
    }

    async getThesisCategoryById(id: string): Promise<ThesisCategory> {
        return await this.thesisCategoryModel.findById(id);
    }
}
