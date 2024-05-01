import { ThesisResponse } from '../../entities';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';

const updateThesisApprovalAction = async (
  id: string,
  approval: boolean
): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  
  const thesis = await thesisService.getThesisById(id);
  if (!thesis) {
    throw new Error('Thesis not found');
  }
  thesis.isApproved = approval;

  return await thesisService.updateThesis(thesis);
};

export default updateThesisApprovalAction;
