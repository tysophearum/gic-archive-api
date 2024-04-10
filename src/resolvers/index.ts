import { UserResolver } from './userResolver';
import { ThesisResolver } from './thesis/thesisResolver';
import { ThesisCategoryResolver } from './thesis/thesisCategoryResolver';
import { ThesisCommentResolver } from './thesis/thesisCommentResolver';
import { ThesisFeedbackResolver } from './thesis/thesisFeedbackResolver';
import { ThesisLikeResolver } from './thesis/thesisLikeResolver';

export default [
  UserResolver,
  ThesisCategoryResolver,
  ThesisResolver,
  ThesisCommentResolver,
  ThesisFeedbackResolver,
  ThesisLikeResolver,
];
