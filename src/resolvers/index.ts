import { UserResolver } from './userResolver';
import { ThesisResolver } from './thesis/thesisResolver';
import { ThesisCategoryResolver } from './thesis/thesisCategoryResolver';
import { ThesisCommentResolver } from './thesis/thesisCommentResolver';
import { ThesisFeedbackResolver } from './thesis/thesisFeedbackResolver';
import { ThesisLikeResolver } from './thesis/thesisLikeResolver';
import { ClassProjectResolver } from './classProject/classProjectResolver';
import { ClassProjectCategoryResolver } from './classProject/classProjectCategoryResolver';
import { ClassProjectCommentResolver } from './classProject/classProjectCommentResolver';
import { ClassProjectFeedbackResolver } from './classProject/classProjectFeedbackResolver';
import { ClassProjectLikeResolver } from './classProject/classProjectLikeResolver';
import { FeaturedClassProjectResolver } from './classProject/featuredClassProjectResolver';
import { FeaturedThesisResolver } from './thesis/featuredThesisResolver';

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
  ClassProjectFeedbackResolver,
  ClassProjectLikeResolver,
  FeaturedClassProjectResolver,
  FeaturedThesisResolver,
];
