"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const useCases_1 = require("./project/useCases");
const express_1 = require("express");
const router = (0, express_1.Router)();
// url after "/api"
const app = new app_1.default([
    router.get('/projects', (req, res) => useCases_1.createUserController.execute(req, res)),
    router.post('/upload', (req, res) => useCases_1.uploadProjectsController.execute(req, res)),
    router.get('/filter', (req, res) => useCases_1.filterProjectsController.execute(req, res))
], 8080);
app.listen();
