import { deleteFile } from '../../util/s3';
import { ThesisRepositoryImpl } from '../../repositories';
import { ThesisService } from '../../services';

const deleteThesisAction = async (id: string): Promise<boolean> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  const thesis = await thesisService.getThesisById(id);
  if (!thesis) {
    throw new Error('Document not found');
  }

  try {
    if (thesis.image) {
      await deleteFile(thesis.image);
    }
    await Promise.all(
      thesis.files.map(async (document) => {
        if (document) {
          await deleteFile(document);
        }
      })
    );
  } catch (error) {
    throw new Error(error);
  }

  return await thesisService.deleteThesis(id);
};

export default deleteThesisAction;
