import * as express from 'express'
import { BaseController } from '../../../http/models/Controller'
import { ProjectRepo } from '../../repos/ProjectsRepo';
import { Project } from '../../models/Project';

export class GetAllProjectsController extends BaseController {
    private projectsRepo: ProjectRepo;

  constructor (projectsRepo: ProjectRepo) {
    super();
    this.projectsRepo = projectsRepo;
  }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
    try {
        const projects = await this.projectsRepo.getAllProjects()
        return this.ok<Project[]>(res, projects || []);
    } catch (err: any) {
      return this.fail(res, err.toString())
    }
  }
}