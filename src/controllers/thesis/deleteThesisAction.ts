import { Thesis } from '../../entities';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';

const deleteThesisAction = async (id: string): Promise<boolean> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  return await thesisService.deleteThesis(id);
};

export default deleteThesisAction;
