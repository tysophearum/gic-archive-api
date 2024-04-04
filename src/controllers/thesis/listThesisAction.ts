import { PaginationInput } from '../../typeDefs';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';
import { ListThesisResponse } from '../../entities';

const listThesisAction = async (pager: PaginationInput, query: any): Promise<ListThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  return await thesisService.getThesis(pager, query);
};

export default listThesisAction;
