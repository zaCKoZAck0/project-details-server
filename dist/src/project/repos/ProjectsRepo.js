"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepo = void 0;
class ProjectRepo {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    rawQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.prismaClient.$queryRawUnsafe(query);
                return projects;
            }
            catch (error) {
                console.error('Raw query execution failed:', error);
                return null;
            }
        });
    }
    createProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProject = yield this.prismaClient.projects.create({
                    data: project
                });
                return createdProject;
            }
            catch (error) {
                console.error('Error creating Project:', error);
                return null;
            }
        });
    }
    createMultipleProjects(project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProjects = yield this.prismaClient.projects.createMany({
                    data: project
                });
                return createdProjects.count;
            }
            catch (error) {
                console.error('Error creating Project:', error);
                return null;
            }
        });
    }
    getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allProject = yield this.prismaClient.projects.findMany();
                return allProject;
            }
            catch (error) {
                console.error('Error getting Projects:', error);
                return null;
            }
        });
    }
}
exports.ProjectRepo = ProjectRepo;
