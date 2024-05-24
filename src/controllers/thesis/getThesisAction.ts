import { Thesis, ThesisResponse } from '../../entities';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';
import { getObjectSignedUrl } from '../../util/s3';

const getThesisAction = async (id: string): Promise<ThesisResponse> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  let thesis = await thesisService.getThesisById(id);

  thesis.image = await getObjectSignedUrl(thesis.image);
  thesis.user.image = await getObjectSignedUrl(thesis.user.image);
  thesis.teacher.image = await getObjectSignedUrl(thesis.teacher.image);

  for (let i = 0; i < thesis.collaborators.length; i++) {
    thesis.collaborators[i].image = await getObjectSignedUrl(thesis.collaborators[i].image);
  }
  return thesis;
};

export default getThesisAction;
