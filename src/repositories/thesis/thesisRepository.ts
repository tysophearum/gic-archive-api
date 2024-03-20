import { getModelForClass } from "@typegoose/typegoose";
import { Thesis, User } from "../../entities";
import { PaginationInput } from "../../typeDefs";

export interface ThesisRepository {
  createThesis(document: Thesis): Promise<Thesis>;
  findThesis(pager: PaginationInput, query: any): Promise<Thesis[]>;
  countThesis(): Promise<number>;
  findThesisById(id: string): Promise<Thesis>;
}

export class ThesisRepositoryImpl implements ThesisRepository {
  private thesisModel = getModelForClass(Thesis);
  private userModel = getModelForClass(User);

  async countThesis(): Promise<number> {
    return await this.thesisModel.countDocuments();
  }

  async createThesis(thesis: Thesis): Promise<Thesis> {
    return (
      await (await this.thesisModel.create(thesis)).populate("user")
    ).populate("collaborators");
  }

  async findThesis({ page, limit }: PaginationInput, query: any = null): Promise<Thesis[]> {
    const skip = (page - 1) * limit;

    return await this.thesisModel
      .find(query)
      .populate("user")
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findThesisById(id: string): Promise<Thesis> {
    return await this.thesisModel.findById(id)
      .populate("user")
      .populate("collaborators")
      .populate("category")
      .exec();
  }
}
