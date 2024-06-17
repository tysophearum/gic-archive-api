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

  const collaboratorsPromises = thesis.collaborators.map(async (collaborator) => {
    collaborator.image = await getObjectSignedUrl(collaborator.image);
  });

  let fileLinks: string[] = [];
  const fileLinksPromises = thesis.files.map(async (file) => {
    const link = await getObjectSignedUrl(file);
    fileLinks.push(link);
  });
  
  // Wait for all promises to resolve
  await Promise.all(collaboratorsPromises);
  await Promise.all(fileLinksPromises);

  thesis.fileLinks = fileLinks;
  return thesis;
};

export default getThesisAction;
