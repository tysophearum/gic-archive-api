import { getModelForClass } from '@typegoose/typegoose';
import { ClassProject, ClassProjectResponse } from '../../entities';
import { PaginationInput } from '../../typeDefs';

export interface ClassProjectRepository {
  createClassProject(classProject: ClassProject): Promise<ClassProjectResponse>;
  findClassProject(pager: PaginationInput, query: any): Promise<ClassProject[]>;
  countClassProject(query: any): Promise<number>;
  findClassProjectById(id: string): Promise<ClassProjectResponse>;
  updateClassProject(classProject: ClassProject): Promise<ClassProjectResponse>;
  deleteClassProject(id: string): Promise<boolean>;
  incrementClassProjectLike(id: string): Promise<boolean>;
  decrementClassProjectLike(id: string): Promise<boolean>;
}

export class ClassProjectRepositoryImpl implements ClassProjectRepository {
  private classProjectModel = getModelForClass(ClassProject);
  private async populateFields(model: any, fields: string[]): Promise<any> {
    for (const field of fields) {
      model = await model.populate(field);
    }
    return model;
  }

  async countClassProject(query: any): Promise<number> {
    return await this.classProjectModel.countDocuments(query);
  }

  async createClassProject(classProject: ClassProject): Promise<ClassProjectResponse> {
    let createdClassProject = await this.classProjectModel.create(classProject);
    createdClassProject = await this.populateFields(createdClassProject, ['user', 'collaborators', 'classProjectCategory']);
    return createdClassProject;
  }

  async findClassProject({ page, limit }: PaginationInput, query: any = null): Promise<ClassProject[]> {
    const skip = (page - 1) * limit;

    return await this.classProjectModel
      .find(query)
      .populate('user')
      .populate('classProjectCategory')
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findClassProjectById(id: string): Promise<ClassProjectResponse> {
    const classProject = await this.classProjectModel
      .findById(id)
      .populate('user')
      .populate('collaborators')
      .populate('classProjectCategory')
      .exec();

    return classProject;
  }

  async updateClassProject(classProject: ClassProject): Promise<ClassProjectResponse> {
    let updatedClassProject = await this.classProjectModel.findByIdAndUpdate(classProject._id, classProject, { new: true });
    updatedClassProject = await this.populateFields(updatedClassProject, ['user', 'collaborators', 'classProjectCategory']);
    return updatedClassProject;
  }

  async deleteClassProject(id: string): Promise<boolean> {
    try {
      await this.classProjectModel.findByIdAndDelete(id).exec();
      return true;
    } catch (error) {
      return false;
    }
  }
  async incrementClassProjectLike(id: string): Promise<boolean> {
    try {
      await this.classProjectModel.findByIdAndUpdate(id, { $inc: { likeAmount: 1 } });
      return true;
    } catch (error) {
      console.log('Unable to like post ', id);
    }
  }
  async decrementClassProjectLike(id: string): Promise<boolean> {
    try {
      await this.classProjectModel.findByIdAndUpdate(id, { $inc: { likeAmount: -1 } });
      return false;
    } catch (error) {
      console.log('Unable to dislike post ', id);
    }
  }
}
