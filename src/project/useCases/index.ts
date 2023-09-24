import { GetAllProjectsController } from './getAllProjects/GetAllProjectsController';
import { UploadProjectsController } from './uploadProjects/UploadProjectsController';
import { FilterProjectsController } from './filterProjects/FilterProjectsController';
import { ProjectRepo } from '../repos/ProjectsRepo';
import { prisma } from '../../infra/prisma';

const userRepo = new ProjectRepo(prisma);
const createUserController = new GetAllProjectsController(userRepo);
const uploadProjectsController = new UploadProjectsController(userRepo);
const filterProjectsController = new FilterProjectsController(userRepo);
 
export { createUserController, uploadProjectsController, filterProjectsController };