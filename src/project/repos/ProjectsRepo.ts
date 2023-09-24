import { Prisma, PrismaClient } from '@prisma/client'
import {Project} from '../models/Project';

class ProjectRepo {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async rawQuery(query: string): Promise<unknown | null> {
    try{
      const projects = await this.prismaClient.$queryRawUnsafe(query);
    return projects
    } catch (error) {
      console.error('Raw query execution failed:', error);
      return null;
    }
  }

  async createProject(project: Project): Promise<Project | null> {
  try {
    const createdProject = await this.prismaClient.projects.create({
      data: project
    });
    return createdProject;
  } catch (error) {
    console.error('Error creating Project:', error);
    return null;
  }
}

  async createMultipleProjects(project: Project[]): Promise<number | null> {
    try {
    const createdProjects = await this.prismaClient.projects.createMany({
      data: project
    });

    return createdProjects.count;
  } catch (error) {
    console.error('Error creating Project:', error);
    return null;
  }
  }


async getAllProjects(): Promise<Project[] | null> {
  try {
    const allProject = await this.prismaClient.projects.findMany();
    return allProject;
  } catch (error) {
    console.error('Error getting Projects:', error);
    return null;
  }
}
}

export { ProjectRepo };