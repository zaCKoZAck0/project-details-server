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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProjectsController = void 0;
const Controller_1 = require("../../../http/models/Controller");
const csvtojson_1 = __importDefault(require("csvtojson"));
class UploadProjectsController extends Controller_1.BaseController {
    constructor(projectsRepo) {
        super();
        this.projectsRepo = projectsRepo;
    }
    executeImpl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                /** convert req buffer into csv string ,
                *   "csvfile" is the name of my file given at name attribute in input tag */
                if (!req.body.csvfile) {
                    return this.forbidden(res, "File not present.");
                }
                if (Array.isArray(req.body.csvfile)) {
                    return this.forbidden(res, "Multiple files present in request.");
                }
                const csvData = req.body.csvfile.toString();
                const json = yield (0, csvtojson_1.default)().fromString(csvData);
                yield this.projectsRepo.createMultipleProjects(json);
                const projects = yield this.projectsRepo.getAllProjects();
                return this.ok(res, projects || []);
            }
            catch (err) {
                return this.fail(res, err.toString());
            }
        });
    }
}
exports.UploadProjectsController = UploadProjectsController;
