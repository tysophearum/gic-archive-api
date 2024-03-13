import { PaginationInput } from "../../typeDefs"
import { ThesisRepositoryImpl } from "../../repositories"
import { ThesisService } from "../../services"
import { ListThesisResponse } from "../../entities/thesis/thesis"

const listThesisAction =async (pager: PaginationInput): Promise<ListThesisResponse> => {
    const thesisRepository = new ThesisRepositoryImpl()
    const thesisService = new ThesisService(thesisRepository)

    return await thesisService.getThesis(pager)
}

export default listThesisAction;