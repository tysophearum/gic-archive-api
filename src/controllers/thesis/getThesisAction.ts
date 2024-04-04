import { Thesis, ThesisResponse } from '../../entities';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';

const getThesisAction = async (id: string): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  return await thesisService.getThesisById(id);
};

export default getThesisAction;
