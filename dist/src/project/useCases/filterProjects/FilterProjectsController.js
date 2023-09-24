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
exports.FilterProjectsController = void 0;
const Controller_1 = require("../../../http/models/Controller");
const openAiChat_1 = require("./openAiChat");
class FilterProjectsController extends Controller_1.BaseController {
    constructor(projectsRepo) {
        super();
        this.projectsRepo = projectsRepo;
    }
    executeImpl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { q } = req.query;
                const sqlQuery = yield (0, openAiChat_1.OpenAIChat)(q);
                if (!sqlQuery) {
                    return this.notFound(res, "Invalid Query");
                }
                const { query, message } = JSON.parse(sqlQuery);
                const projects = yield this.projectsRepo.rawQuery(query);
                return this.ok(res, { projects, message });
            }
            catch (err) {
                return this.fail(res, err.toString());
            }
        });
    }
}
exports.FilterProjectsController = FilterProjectsController;
