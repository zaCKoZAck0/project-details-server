import * as express from 'express'
import { BaseController } from '../../../http/models/Controller'
import { ProjectRepo } from '../../repos/ProjectsRepo';
import { Project } from '../../models/Project';
import csvtojson from 'csvtojson'


export class UploadProjectsController extends BaseController {
    private projectsRepo: ProjectRepo;

  constructor (projectsRepo: ProjectRepo) {
    super();
    this.projectsRepo = projectsRepo;
  }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
    try {
      console.log(req.body)
        /** convert req buffer into csv string , 
        *   "csvfile" is the name of my file given at name attribute in input tag */
        if (!req.body.csvfile){
            return this.forbidden(res, "File not present.")
        }
        if (Array.isArray(req.body.csvfile)){
            return this.forbidden(res, "Multiple files present in request.")
        }
        const csvData = req.body.csvfile.toString();
        const json = await csvtojson().fromString(csvData)      
        
        await this.projectsRepo.createMultipleProjects(json)
        const projects = await this.projectsRepo.getAllProjects()
        return this.ok<Project[]>(res, projects || []);
    } catch (err: any) {
      return this.fail(res, err.toString())
    }
  }
}