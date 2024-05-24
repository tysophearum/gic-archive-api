import { PaginationInput } from '../../typeDefs';
import { ListDocumentResponse, MinClassProject, MinDocument, User } from '../../entities';
import { listThesisAction } from '../../controllers/thesis';
import { listClassProjectAction } from '../../controllers/classProject';
import combinePaginations from '../../util/combinePaginations';

const listDocumentAction = async (user: User, query: any, sortField: keyof typeof MinDocument, ascending: boolean = true, pager: PaginationInput, sort?: any): Promise<ListDocumentResponse> => {
  const theses = await listThesisAction(user, pager, query, sort);
  const classProjects = await listClassProjectAction(user, pager, query, sort);

  // const documents: typeof MinDocument[] = [
  //   ...theses.data.map(thesis => {
  //     {
  //       return {
  //         ...thesis,
  //         __typename: 'thesis',
  //       };
  //     }
  //   }),
  //   ...classProjects.data.map(classProject => {
  //     {
  //       return {
  //         ...classProject,
  //         __typename: 'classProject',
  //       };
  //     }
  //   }),
  // ]

  const documents: typeof MinDocument[] = [
    ...theses.data,
    ...classProjects.data,
  ]

  documents.sort((a, b) => {
    if (a[sortField] === undefined || b[sortField] === undefined) return 0;

    if (ascending) {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const pagination = combinePaginations(theses.pagination, classProjects.pagination);

  const documentsResponse: ListDocumentResponse = {
    data: documents,
    pagination,
  };

  return documentsResponse;
};

export default listDocumentAction;
