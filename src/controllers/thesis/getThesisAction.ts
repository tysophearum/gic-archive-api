import { Thesis, ThesisResponse } from '../../entities';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';
import { getObjectSignedUrl } from '../../util/s3';

const getThesisAction = async (id: string): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  let thesis = await thesisService.getThesisById(id);

  thesis.image = await getObjectSignedUrl(thesis.image);

  return thesis;
};

export default getThesisAction;
