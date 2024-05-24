import {  MinDocument, User } from '../../entities';
import { listFeaturedThesisAction } from '../../controllers/thesis';
import { listFeaturedClassProjectAction } from '../../controllers/classProject';

const listFeatredDocumentAction = async (user: User, query: any, sort?: any): Promise<typeof MinDocument[]> => {
  const theses = await listFeaturedThesisAction(user, query, sort);
  const classProjects = await listFeaturedClassProjectAction(user, query, sort);

  const documents: typeof MinDocument[] = [
    ...theses,
    ...classProjects,
  ]

  return documents;
};

export default listFeatredDocumentAction;
