import { UserResolver } from './userResolver';
import { ThesisResolver } from './thesis/thesisResolver';
import { ThesisCategoryResolver } from './thesis/thesisCategoryResolver';
import { ThesisCommentResolver } from './thesis/thesisCommentResolver';
import { ThesisFeedbackResolver } from './thesis/thesisFeedbackResolver';
import { ThesisLikeResolver } from './thesis/thesisLikeResolver';
import { ClassProjectResolver } from './classProject/classProjectResolver';
import { ClassProjectCategoryResolver } from './classProject/classProjectCategoryResolver';
import { ClassProjectCommentResolver } from './classProject/classProjectCommentResolver';
import { ClassProjectLikeResolver } from './classProject/classProjectLikeResolver';

export default [
  UserResolver,
  ThesisCategoryResolver,
  ThesisResolver,
  ThesisCommentResolver,
  ThesisFeedbackResolver,
  ThesisLikeResolver,
  ClassProjectResolver,
  ClassProjectCategoryResolver,
  ClassProjectCommentResolver,
  ClassProjectLikeResolver
];
