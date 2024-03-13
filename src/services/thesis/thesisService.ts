import calculatePaginationResponse from "../../util/calculatePaginationResponse";
import { Thesis } from "../../entities";
import { ThesisRepository } from "../../repositories";
import { PaginationInput } from "../../typeDefs";
import { ListThesisResponse } from "../../entities/thesis/thesis";

export class ThesisService {
    private thesisRepository: ThesisRepository

    constructor (thesisRepository: ThesisRepository) {
        this.thesisRepository = thesisRepository;
    }

    async createThesis(thesis: Thesis): Promise<Thesis> {
        return await this.thesisRepository.createThesis(thesis);
    }

    async getThesis(pager: PaginationInput={page: 1, limit: Number(process.env.MAX_LIMIT)}, query: any=null): Promise<ListThesisResponse> {
        const thesis = await this.thesisRepository.findThesis(pager, query);
        const totalThesis = await this.thesisRepository.countThesis();
        const pagination = calculatePaginationResponse(pager, totalThesis);

        return {
            thesis,
            pagination
        }
    }
}