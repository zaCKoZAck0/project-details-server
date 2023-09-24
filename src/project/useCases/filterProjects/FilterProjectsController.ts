import * as express from 'express'
import { BaseController } from '../../../http/models/Controller'
import { ProjectRepo } from '../../repos/ProjectsRepo';
import { Project } from '../../models/Project';
import { OpenAIChat } from './openAiChat';

export class FilterProjectsController extends BaseController {
    private projectsRepo: ProjectRepo;

  constructor (projectsRepo: ProjectRepo) {
    super();
    this.projectsRepo = projectsRepo;
  }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
    try {
        const {q} = req.query;
        const sqlQuery = await OpenAIChat(q as string);
        if (!sqlQuery){
          return this.notFound(res, "Invalid Query")
        }
        const {query, message} = JSON.parse(sqlQuery)
        const projects = await this.projectsRepo.rawQuery(query)

        return this.ok<unknown>(res, {projects, message});
    } catch (err: any) {
      return this.fail(res, err.toString())
    }
  }
}