import { ThesisRepositoryImpl } from "../../repositories";
import { ThesisService } from "../../services";
import { ClassProjectRepositoryImpl } from "../../repositories";
import { ClassProjectService } from "../../services";
import { Contribution } from "../../entities";

const getUserContribution = async (query: any): Promise<Contribution> => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  const classProjectCount = await classProjectService.countClassProject(query);
  const thesisCount = await thesisService.countThesis(query);

  return {
    classProjectCount,
    thesisCount,
  };
}

export default getUserContribution;